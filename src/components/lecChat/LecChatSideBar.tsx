import { ConversationList, Sidebar } from '@chatscope/chat-ui-kit-react'
import React from 'react'
import LecChatConversation from './LecChatConversation'
import { useChatState } from '@/lib/hooks/useLecChat'

export default function LecChatSideBar() {
    const chatState = useChatState();
    return (
        <Sidebar position="left">
                <ConversationList>
                    {chatState.lastMessages.map((message, index) => (
                        <LecChatConversation key={index} lastMessage={message.lastMessage} user={message.user}/>
                    ))}
                </ConversationList>
        </Sidebar>
    )
}