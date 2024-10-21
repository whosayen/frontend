'use client'
import { LecComments } from "@/lib/types/clientTypes";
import { Card, Typography, Box, Avatar, Stack, Rating, Alert } from "@mui/material";
import defaultProfileImage from "@/assets/blank-profile-picture.png";

interface TutorCommentsCardProps {
    comments: LecComments[];
}

function isBase64(str: string | null): boolean {
    if (!str) return false;
    return str.startsWith("data:image");
}

export default function TutorCommentsCard({comments}: TutorCommentsCardProps): JSX.Element {
    return (
        <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Student Comments</Typography>
            <Stack spacing={2} mt={2}>
                {comments.map((comment, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "flex-start" }}>
                        <Avatar 
                            src={comment.profilePicture && isBase64(comment.profilePicture) ? comment.profilePicture : `data:image/jpeg;base64,${comment.profilePicture || defaultProfileImage.src}`} 
                            sx={{ width: 50, height: 50, mr: 2 }} 
                        />
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>{comment.name}</Typography>
                            <Rating name="read-only" value={comment.rate} readOnly size="small" />
                            <Typography variant="body2" sx={{ mt: 1 }}>{comment.content}</Typography>
                        </Box>
                    </Box>
                ))}
                {comments.length === 0 && <Alert severity="info">No comments yet</Alert>}
            </Stack>
        </Card>
    );
}