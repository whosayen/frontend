'use client'

import ProfilePage from "@/components/parts/ProfilePage";
import React, {useEffect} from "react";
import {getUserProfile, isStudentProfile, IStudentProfile, ITutorProfile} from "@/lib/user";
import ErrorAlert from "@/components/common/error-handling/ErrorAlert";
import { Box } from "@mui/material";

/**
 * @deprecated
 */
export function Profile() {
    const [userData, setUserData] = React.useState<ITutorProfile | IStudentProfile>();

    const getUserData = async () => {
        try {
            const response = await getUserProfile();
            setUserData(response);
        } catch (e) {
            console.error(e);
        }

    }

    useEffect(() => {
        (async () => {
            await getUserData();
        })();
    }, []);

    if (!userData) {
        return <></>; // TODO add loading screen
    }

    if (isStudentProfile(userData)) {
        return (
            <>
                <Box sx={{ mb: 4 }}>
                    <ProfilePage data={userData} />
                </Box>
            </>
        );
    }
    

    return <>
        <ErrorAlert message={"Unknown user type"}></ErrorAlert>
    </>;
}