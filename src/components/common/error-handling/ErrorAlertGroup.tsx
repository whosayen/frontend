import ErrorAlert from "@/components/common/error-handling/ErrorAlert";
import Stack from "@mui/material/Stack";

type Props = {
    messageList: string[];
};
export default function ErrorAlertGroup(props: Props) {
    if (props.messageList.length === 0)
        return (
            <>
            </>
        )

    return (
        <Stack direction="column" spacing={.5}>
            {props.messageList.map((message, index) => (
                <ErrorAlert key={index} message={message}/>
            ))}
        </Stack>
    );
};
