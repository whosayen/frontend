import NotFound404 from "@/components/NotFound404";
import UserPublicProfile from "@/components/UserPublicProfile";
import { fetchUserData } from "@/lib/api";

export default async function Page({ params }: { params: { userId: string } }) {
    try {
        const fullUserData = await fetchUserData(params.userId);

        if (!fullUserData) {
            return <NotFound404 />;
        }

        return (
            <>
                <UserPublicProfile data={fullUserData} />
            </>
        );
    } catch (error) {
        console.error("Error fetching user data:", error);
        return <div> Error: {`${error}`}</div>;
    }
}