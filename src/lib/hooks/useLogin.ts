import { LoginFormValues } from "../types/clientTypes";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { saveAuthorizationTokens } from "@/lib/utils";
import { fi } from "date-fns/locale";
import api from "../apiConfig";

export function useLogin() {
    const [errors, setErrors] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter()

    useEffect(() => {
        if (sessionStorage.getItem("accessToken") && localStorage.getItem("refresh_token")) {
            if (sessionStorage.getItem("role") === "TUTOR")
                router.push(`/tutor/${sessionStorage.getItem("id")}`);
            else
                router.push("/");
        }
    }, []);

    const fetchData = async (email: string, password: string) => {
        try {
            // Use the axios instance to make the POST request
            const response = await api.post('/users/login', {
                email: email,
                password: password,
            });

            // If the request is successful, return the response data
            return response.data;
        } catch (error: any) {
            // Check if the error has a response and handle HTTP errors
            if (error.response) {
                const errorArr = error.response.data.errors || [];
                console.error("HTTP error occurred: ", `status=${error.response.status}`, `message=${errorArr}`);
                setErrors(errorArr.map((err: any) => err.message || "An error occurred"));
            } else {
                // Handle unexpected errors like network issues
                console.error("An unexpected error occurred:", error);
                setErrors(["Something went wrong, please try again later."]);
            }
            return null;
        }
    };

    const login = async (formValues: LoginFormValues) => {
        if (loading)
            return;

        setErrors([]);
        setLoading(true);

        try {
            const data = await fetchData(formValues.username, formValues.password);
            if (data) {
                saveAuthorizationTokens(data);
                if (data.role === "TUTOR") {
                    router.push(`/tutor/${data.id}`);
                }
                else {
                    router.push("/");
                }

            }
        } catch (error) {
            console.error(error)
            setErrors(["Something went wrong, please try again later."])
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    const reset = () => {
        setErrors([]);
        setLoading(false);
    }

    return {
        errors,
        login,
        loading,
        reset
    }
}