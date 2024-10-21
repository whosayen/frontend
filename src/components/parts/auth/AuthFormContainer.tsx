import React from "react";
import Box from "@mui/material/Box";
import CenterVerticallyAndHorizontally from "@/components/common/CenterVerticallyAndHorizontally";

export function AuthFormContainer({children}: { children: React.ReactNode }) {
    return <Box flex={1}>
        <Box maxWidth="385px" mx="auto" sx={{height: "100%"}}>
            <CenterVerticallyAndHorizontally>
                {children}
            </CenterVerticallyAndHorizontally>
        </Box>
    </Box>;
}