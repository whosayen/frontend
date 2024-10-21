import {Alert} from "@mui/material";

type Props = {
    message: string;
};
export default function ErrorAlert(props: Props) {
    return (
        <Alert severity="error" sx={{width: '100%'}}>
            {props.message}
        </Alert>
    );
};
