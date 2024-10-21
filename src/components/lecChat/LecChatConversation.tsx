import { fetchPublicUserData } from '@/lib/api';
import { useChatSelectUser } from '@/lib/hooks/useLecChat';
import { ChatMessageDto, FullUserSearchDto, UserDto } from '@/lib/types/dtoTypes';
import { Avatar, Conversation } from '@chatscope/chat-ui-kit-react';
import MuiAvatar from "@mui/material/Avatar";
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

type Props = {
    lastMessage: ChatMessageDto;
    user: UserDto;
};

const LecChatConversation = ({ lastMessage, user: user }: Props) => {
    const selectUser = useChatSelectUser();
    const [userData, setUser] = useState<FullUserSearchDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const name = `${userData?.userSettingsSearchDto.firstName} ${userData?.userSettingsSearchDto.lastName}`.trim().toUpperCase();
    const avatarSrc = null; // TODO Replace with the actual avatar URL

    const handleConversationClick = () => {
        if (!userData)
            return;
        selectUser(userData);
    }

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchPublicUserData(user.id); // Assuming `name.id` is the user ID
                setUser(data);
            } catch (err) {
                setError('Failed to load user data');
                console.error('Error fetching user data:', err);
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, [user.id]);

    if (loading) {
        return (
            <Box display="flex" alignItems="center">
                <Skeleton variant="circular" width={40} height={40} />
                <Box marginLeft={2}>
                    <Skeleton variant="text" width={140} height={20} />
                    <Skeleton variant="text" width={200} height={15} />
                </Box>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" alignItems="center">
                <MuiAvatar></MuiAvatar>
                <Box marginLeft={2}>
                    <Box component="span" color="error.main">
                        {error}
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Conversation info={lastMessage.content} name={name} onClick={handleConversationClick}>
            {avatarSrc ? (
                <Avatar name={name} src={avatarSrc} />
            ) : (
                <Avatar name={name}>
                    <MuiAvatar>{name[0]}</MuiAvatar>
                </Avatar>
            )}
        </Conversation>
    );
};

export default LecChatConversation;
