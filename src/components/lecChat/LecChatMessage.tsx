import { ChatMessageDto } from '@/lib/types/dtoTypes'
import { Avatar, Message } from '@chatscope/chat-ui-kit-react'
import React, { useEffect, useState } from 'react'
import MuiAvatar from "@mui/material/Avatar";
import { LecChatMessageData } from '@/lib/types/clientTypes';

type Props = {
    message: LecChatMessageData
}

// TODO Replace with the actual avatar URL

function LecChatMessage({message: messageData}: Props) {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const id = sessionStorage.getItem('id');

        if (!id) {
            throw new Error('No user ID found');
        }

        setUserId(id);
    }, []);

    return (
       <Message model={{
              direction: messageData.direction,
              message: messageData.content,
              position: 'first',
              sender: 'Zoe',
              sentTime: '15 mins ago'
         }} >
            {messageData.direction === 'incoming' && (
                <Avatar>
                    <MuiAvatar>{messageData.senderName[0]}</MuiAvatar>
                </Avatar>
            )}
         </Message>
    )
}

export default LecChatMessage