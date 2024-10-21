import { useChatMessage } from "@/lib/hooks/useLecChat";
import {
    Avatar,
    ChatContainer,
    ConversationHeader,
    MessageInput,
    MessageList
} from "@chatscope/chat-ui-kit-react";

import MuiAvatar from "@mui/material/Avatar";
import LecChatMessage from "./LecChatMessage";

type LecChatContainerProps = {}

const LecChatContainer = (props: LecChatContainerProps) => {
    const { selectedUser, messages, sendMessage, newMessages} = useChatMessage();
    const avatarSrc = null; // TODO Replace with the actual avatar URL



    return (
        <ChatContainer>
            {selectedUser &&
                <ConversationHeader>
                    <ConversationHeader.Back />
                    <Avatar>
                        <MuiAvatar>{selectedUser?.userSettingsSearchDto.firstName[0]}</MuiAvatar>
                    </Avatar>
                    <ConversationHeader.Content userName={selectedUser?.userSettingsSearchDto.firstName} />
                    {/* <ConversationHeader.Actions>
                        <EllipsisButton orientation="vertical" />
                    </ConversationHeader.Actions> */}
                </ConversationHeader>
            }

            <MessageList>
                {!selectedUser && (
                    <MessageList.Content
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            fontSize: '1.2em',
                            height: '100%',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                    >
                        Choose a conversation to start chatting
                    </MessageList.Content>
                )}
                {messages.map((message, index) => (
                    <LecChatMessage key={index} message={message} />
                ))}
                {/* {newMessages.length > 0 && <MessageSeparator content="TODAY" />} */}
                {newMessages.map((message, index) => (
                    <LecChatMessage key={index} message={message} />
                ))}
            </MessageList>
            <MessageInput placeholder="Type message here" attachButton={false} disabled={!selectedUser} onSend={(sr) => sendMessage(sr)} />
        </ChatContainer>
    )
}

export default LecChatContainer