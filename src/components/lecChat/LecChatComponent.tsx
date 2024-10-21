import React from "react";

import {
    MainContainer,
} from "@chatscope/chat-ui-kit-react";

import LecChatSideBar from "./LecChatSideBar";
import LecChatProvider from "./LecChatProvider";
import LecChatContainer from "./LecChatContainer";



export function LecChatComponent() {
    return (
        <LecChatProvider>
            <MainContainer responsive style={{height: '600px'}}>
                <LecChatSideBar />
                <LecChatContainer />
            </MainContainer>
        </LecChatProvider>
    );
}
