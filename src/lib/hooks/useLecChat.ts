// Written by Muhammed 
import React, { createContext, Dispatch, use, useCallback, useEffect, useRef} from "react";
import {ChatMessageRequest, ChatNotification, FullUserSearchDto, UserLastMessageDto } from "../types/dtoTypes";
import { Draft } from 'immer';
import { fetchPublicUserData, fetchUserData, findChatMessages, getLastMessages } from "../api";
import { Client, Frame, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { LecChatMessageData } from "../types/clientTypes";
import { convertToLecChatMessageData } from "../utils";
import { BASE_URL } from "../apiConfig";

export type ChatState = {
    lastMessages: UserLastMessageDto[];
    selectedUser?: FullUserSearchDto;
    user?: FullUserSearchDto;
    pastMessages: LecChatMessageData[];
    newMessages: LecChatMessageData[];
}


export type ChatAction = {
    type: 'SET_LAST_MESSAGES';
    payload: UserLastMessageDto[];
} | {
    type: 'SET_SELECTED_USER';
    payload: FullUserSearchDto;
} | {
    type: 'SET_USER';
    payload: FullUserSearchDto;
} | {
    type: 'SET_MESSAGES';
    payload: LecChatMessageData[];
} | {
    type: 'ADD_NEW_MESSAGE';
    payload: LecChatMessageData;
} 

export const initialChatState: ChatState = {
    lastMessages: [],
    pastMessages: [],
    newMessages: [],
}

export const chatReducer = (draft: Draft<ChatState>, action: ChatAction): ChatState => {
    switch (action.type) {
        case 'SET_LAST_MESSAGES':
            draft.lastMessages = action.payload;
            return draft;
        case 'SET_SELECTED_USER':
            draft.selectedUser = action.payload;
            draft.newMessages = [];
            return draft;
        case 'SET_USER':
            draft.user = action.payload;
            return draft;
        case 'SET_MESSAGES':
            draft.pastMessages = action.payload;
            return draft;
        case 'ADD_NEW_MESSAGE':
            draft.newMessages.push(action.payload);
            return draft;
        default:
            return draft;
    }
}

export const ChatStateContext = createContext<ChatState>(initialChatState);
export const ChatDispatchContext = createContext<Dispatch<ChatAction>>(() => null);

export const useChatState = () => {
    const state = React.useContext(ChatStateContext);

    if (state === undefined) {
        throw new Error('useChatState must be used within a LecChatProvider');
    }

    return state;
}

export const useChatDispatch = () => {
    const dispatch = React.useContext(ChatDispatchContext);

    if (dispatch === undefined) {
        throw new Error('useChatDispatch must be used within a LecChatProvider');
    }

    return dispatch;
}

export const useChatSelectUser = () => {
    const chatDispatch = useChatDispatch();
    
    const selectUser = async (selectedUser: FullUserSearchDto) => {
        const userId = sessionStorage.getItem('id')

        if (!userId) {
            console.error('No user ID found');
            return;
        }

        chatDispatch({ type: 'SET_SELECTED_USER', payload: selectedUser });

        try {
            const messages = await findChatMessages(userId, selectedUser.userSearchDto.id)

            // Sort messages by timestamp
            messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

            const lecMessages = messages.map((message) => convertToLecChatMessageData(message));

            chatDispatch({ type: 'SET_MESSAGES', payload: lecMessages });
        }
        catch (error) {
            console.error('Error fetching chat messages:', error);
        }
        ;
    }

    return selectUser;
}



export const useChatMessage = () => {
    const state = React.useContext(ChatStateContext);
    const dispatch = React.useContext(ChatDispatchContext);
    const [error, setError] = React.useState<string | null>(null);
    const [userId, setUserId] = React.useState<string | null>(null);
    

    const onMessageReceivedCallback = useCallback((message: ChatNotification) => {
        const newMessage: LecChatMessageData = {
            direction: 'incoming',
            content: message.content,
            senderName: message.chatUserSettingsDto.firstName + ' ' + message.chatUserSettingsDto.lastName,
        };

        dispatch({ type: 'ADD_NEW_MESSAGE', payload: newMessage});
    }, [dispatch]);

    const {sendMessage: wsSendMessage} = useChatWebSocket(onMessageReceivedCallback);


    if (state === undefined || dispatch === undefined) {
        throw new Error('useLecChat must be used within a LecChatProvider');
    }
    
    const lastMessages = state.lastMessages;
    const selectedUser = state.selectedUser;
    const messages = state.pastMessages;
    const newMessages = state.newMessages;

    const selectUser = async (selectedUser: FullUserSearchDto) => {
        if (!userId) {
            console.error('No user ID found');
            return;
        }

        dispatch({ type: 'SET_SELECTED_USER', payload: selectedUser });

        try {
            const messages = await findChatMessages(userId, selectedUser.userSearchDto.id)

            // Sort messages by timestamp
            messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

            const lecMessages = messages.map((message) => convertToLecChatMessageData(message));

            dispatch({ type: 'SET_MESSAGES', payload: lecMessages });
        }
        catch (error) {
            setError('Failed to load chat messages');
            console.error('Error fetching chat messages:', error);
        }
        ;
    }

    const sendMessage = (input: string) => {
        if (!selectedUser) {
            console.error('No selected user found');
            return;
        }

        if (!userId) {
            console.error('No user ID found');
            return;
        }

        wsSendMessage(input, selectedUser.userSearchDto.id);

        const newMessage: LecChatMessageData = {
            direction: 'outgoing',
            content: input,
        };

        dispatch({ type: 'ADD_NEW_MESSAGE', payload: newMessage });
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const lastMessages = await getLastMessages();
                dispatch({ type: 'SET_LAST_MESSAGES', payload: lastMessages });
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchMessages();
    }, [dispatch]);

    useEffect(() => {
        const getUserData = async () => {
            if (!userId) {
                return;
            }

            try {
                const data = await fetchPublicUserData(userId);
                dispatch({ type: 'SET_USER', payload: data });
            } catch (err) {
                setError('Failed to load user data');
                console.error('Error fetching user data:', err);
            }
        };

        getUserData();
    }, [userId, dispatch]);

    useEffect(() => {
        const userId = sessionStorage.getItem('id');

        if (!userId) {
            throw new Error('No user ID found');
        }

        setUserId(userId);
    }, []);

    return { error, lastMessages, selectUser, selectedUser, messages, sendMessage, newMessages};
}

export const useChatWebSocket = (onMessageReceived: (message: ChatNotification) => void) => {
    const stompClientRef = useRef<Client | null>(null);

    const reconnect = () => {
        setTimeout(() => {
            if (!stompClientRef.current?.connected) {
                stompClientRef.current?.activate();
            }
        }, 5000);  // Retry connection after 5 seconds
    };

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');

        if (!accessToken) {
            console.error('No access token found');
            return;
        }

        const id = sessionStorage.getItem('id');

        if (!id) {
            console.error('No user ID found');
            throw new Error('No user ID found');
        }

        // Create a new STOMP client with SockJS
        const socket = new SockJS(`${BASE_URL}/ws?accessToken=${accessToken}`);
        const stompClient = new Client({
            webSocketFactory: () => socket as WebSocket,
            connectHeaders: {
                Authorization: `Bearer ${accessToken}` // Add the token to the WebSocket connection headers
                },
            onConnect: (frame: Frame) => {
                console.log('Connected: ' + frame);

                // Subscribe to the user's message queue
                const subscription: StompSubscription = stompClient.subscribe(
                    `/user/${id}/queue/messages`,
                    (message) => {
                        console.log('Message received:', message);
                        try {
                            const receivedMessage = JSON.parse(message.body) as ChatNotification;
                            console.log('Parsed message:', receivedMessage);
                            onMessageReceived(receivedMessage);
                        } catch (error) {
                            console.error('Error parsing message:', error);
                        }
                    }
                );
                
                if (subscription) {
                    console.log('Subscription to /user/queue/messages was successful.');
                }

                return () => {
                    subscription.unsubscribe();
                    stompClient.deactivate();
                };
            },
            onDisconnect: () => {
                console.log('Disconnected');
                reconnect();
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
                reconnect();
            },
        });

        // Connect the client
        stompClient.activate();
        stompClientRef.current = stompClient;

        // Cleanup function to deactivate the client on component unmount
        return () => {
            console.log('Deactivated STOMP client');
            stompClient.deactivate();
        };
    }, [onMessageReceived]);

    const sendMessage = (input: string, recipientId: string) => {
        if (stompClientRef.current && input.trim() !== '') {
            const chatMessage: ChatMessageRequest = {
                content: input,
                recipientId: recipientId,
            };
            stompClientRef.current.publish({
                destination: '/app/chat',
                body: JSON.stringify(chatMessage),
            });
        }
    };

    return { sendMessage};
}

