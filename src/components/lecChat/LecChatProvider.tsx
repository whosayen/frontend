import React from 'react'
import { useImmerReducer } from 'use-immer'
import {ChatDispatchContext, chatReducer, ChatStateContext, initialChatState } from '@/lib/hooks/useLecChat'

type LecChatProviderProps = {
    children: React.ReactNode
}

function LecChatProvider({children}: LecChatProviderProps) {
    const [state, dispatch] = useImmerReducer(chatReducer, initialChatState)

    return (
        <ChatStateContext.Provider value={state}>
            <ChatDispatchContext.Provider value={dispatch}>
                {children}
            </ChatDispatchContext.Provider>
        </ChatStateContext.Provider>
    )
}

export default LecChatProvider