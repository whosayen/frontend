'use client'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React, {useEffect, useState} from 'react'
import { LecChatComponent } from './LecChatComponent';
import NotAuthorized from '../NotAuthorized';

function LecChatClient() {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        setAccessToken(sessionStorage.getItem('accessToken'));
    }, []);

    if (!accessToken) {
        return (
            <>
                <NotAuthorized />
            </>
        )
    }

    return (
        <>
            <LecChatComponent />
        </>
    )
}

export default LecChatClient