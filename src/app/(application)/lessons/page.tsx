import UpComingLessons from "@/components/UpComingLessons";
import {Paper} from "@mui/material";
import Stack from "@mui/material/Stack";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import CenterVerticallyAndHorizontally from "@/components/common/CenterVerticallyAndHorizontally";

export default function Lessons(){
    return (
        <>
            <Paper sx={{padding: 10, margin: 10}} draggable={false}>
                <Stack gap={10}>
                    <Box>
                        <CenterVerticallyAndHorizontally>
                            <Typography variant="h3"> Upcoming Lessons </Typography>
                        </CenterVerticallyAndHorizontally>
                        <UpComingLessons/>
                    </Box>
                    <Box>
                        <CenterVerticallyAndHorizontally>
                            <Typography variant="h3"> Recent Lessons </Typography>
                        </CenterVerticallyAndHorizontally>
                        <UpComingLessons/>
                    </Box>
                </Stack>
            </Paper>
        </>
    );
}