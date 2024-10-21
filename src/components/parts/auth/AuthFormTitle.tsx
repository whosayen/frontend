import Typography from "@mui/material/Typography";
import React from "react";

export function AuthFormTitle({title}: { title: string }) {
    return <Typography variant="h2" sx={{letterSpacing: "0.40rem", m: 1}} color="primary"
                       fontWeight="bold"> {title} </Typography>;
}