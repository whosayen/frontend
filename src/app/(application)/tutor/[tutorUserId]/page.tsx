import { Container, Stack } from "@mui/material";
import TutorHeaderCard from "@/components/TutorHeaderCard";
import TutorCommentsCard from "@/components/TutorCommentsCard";
import TutorScheduleCard from "@/components/TutorScheduleCard";
import { fetchPublicUserData} from "@/lib/api";
import NotFound404 from "@/components/NotFound404";
import TutorProfile from "@/components/TutorProfile";
import { LecComments } from "@/lib/types/clientTypes";

export default async function Page({ params }: { params: { tutorUserId: string } }) {
    try {
        const tutorFullUserPublicData = await fetchPublicUserData(params.tutorUserId);

        if (!tutorFullUserPublicData || tutorFullUserPublicData.tutorSearchDto === null) {
            return <NotFound404 />;
        }

        const tutorId = tutorFullUserPublicData.tutorSearchDto.tutorId;

        const comments: Array<LecComments> = tutorFullUserPublicData.tutorSearchDto.enrollmentDtos
            .filter((enrollment) => enrollment.rate !== null || enrollment.comment !== null)
            .map((enrollment) => {
            return {
                name: enrollment.userSettings.firstName + " " + enrollment.userSettings.lastName,
                rate: enrollment.rate,
                content: enrollment.comment,
                profilePicture: enrollment.userSettings.image ,
            };
        });

        return (
            <Container fixed>
                <Stack spacing={4} marginTop={2} sx={{ width: '100%' }}>
                    <TutorHeaderCard tutorUserId={params.tutorUserId} />
                    <TutorProfile tutorUserId={params.tutorUserId} /> {/* Use the new TutorProfile component */}
                    <TutorScheduleCard tutorId={tutorId} price={tutorFullUserPublicData.tutorSearchDto.hourlyRate}/>
                    <TutorCommentsCard comments={comments}/>
                </Stack>
            </Container>
        );
    } catch (error) {
        console.error("Error fetching tutor data:", error);
        return <div> Error: {`${error}`}</div>;
    }
}
