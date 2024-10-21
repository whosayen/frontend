import { SignupFormValues } from "../types/clientTypes";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from "../apiConfig";

export function useCreateOTP() {
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const fetchData = async (email: string) => {
        console.log(email);

        try {
            // Use axios instance to make the POST request
            const response = await api.post('/email-tokens/create', null, {
                params: { email: email },
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Return response if request is successful
            return response;
        } catch (error: any) {
            // Handle error response
            if (error.response) {
                const errorArr = error.response.data.errors || [];
                console.error("HTTP error occurred: ", `status=${error.response.status}`, `message=${errorArr}`);
                setErrors(errorArr.map((err: any) => err.message || "An error occurred"));
            } else {
                // Handle unexpected errors, like network issues
                console.error("An unexpected error occurred:", error);
                setErrors(["Something went wrong, please try again later."]);
            }
            return null;
        }
    };


    const createOTP = async (formValues: SignupFormValues) => {
        if (loading)
            return;

        setErrors([]);
        setLoading(true);

        try {
            const response = await fetchData(formValues.email);
            if (response === null) { // This implies an error has occurred and was handled in fetchData
                // Since errors are already handled in fetchData, there's no need to do anything here
                return;
            }

            // Assuming the response is OK if we reach this point, since fetchData returns null on error
            sessionStorage.setItem("email", formValues.email);
            router.push("/auth/signup/code-verification");
        } catch (error) {
            console.error("Signup error:", error);
            // Here, you handle unexpected errors that might have occurred and weren't caught by fetchData
            // For example, network issues that throw exceptions
            setErrors(["Something went wrong, please try again later."]);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setErrors([]);
        setLoading(false);
    };

    return { createOTP, reset, errors, loading };
}