'use client'
import api from "@/lib/apiConfig";
import { LoadingButton } from "@mui/lab";
import { Box, Input, Link, Stack, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AuthFormTitle } from "../AuthFormTitle";

const VerificationInput = styled(Input)(({ theme }) => ({
    width: "2rem",
    fontSize: "1.4rem",
    fontWeight: "600",
    color: theme.palette.primary.main,
    input: { textAlign: "center " },
    appearance: "textfield",
    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
        appearance: "none",
        margin: 0
    }
}));


const CodeVerificationUI = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [code, setCode] = useState(Array(5).fill(""));
    const length = 5; // Change this to the desired code length

    const router = useRouter();

    useEffect(() => {
        const email = sessionStorage.getItem('email');
        if (email === null) {
            console.error('Email not found');
            router.push("/auth/signup");
        }
    }, []);

    const handleVerify = async (ev: any) => {
        ev.preventDefault();

        const email = sessionStorage.getItem('email');
        let otp;

        if (isValid) {
            otp = code.join(""); // Combine the code array into a single string
        }

        try {
            // Use the axios instance to make the PUT request
            const response = await api.put('/email-tokens/check-otp', null, {
                params: {
                    email: email,
                    otp: otp,
                }
            });

            if (response.status === 202) { // Check if the request was successful
                setIsSubmitted(true);
                router.push("/auth/signup/password"); // Redirect to the password setup page
            } else {
                console.error('Verification failed');
            }
        } catch (error) {
            console.error('An error occurred while verifying:', error);
        }
    };

    const update = (index: any, val: any) => {
        setCode((prevState) => {
            const slice = prevState.slice();
            slice[index] = val;
            return slice;
        });
    };

    const formRef = useRef(null);

    function handleKeyDown(evt: any) {
        const index = parseInt(evt.currentTarget.dataset.index);
        const form = formRef.current as HTMLFormElement | null; // Conditional type assertion

        if (!form || isNaN(index)) return;

        const prevIndex = index - 1;
        const nextIndex = index + 1;
        const prevInput = form.querySelector(`.input-${prevIndex}`) as HTMLInputElement | null; // Conditional type assertion
        const nextInput = form.querySelector(`.input-${nextIndex}`) as HTMLInputElement | null; // Conditional type assertion

        switch (evt.key) {
            case "Backspace":
                if (code[index]) update(index, "");
                else if (prevInput) prevInput.select();
                break;
            case "ArrowRight":
                evt.preventDefault();
                if (nextInput) nextInput.focus();
                break;
            case "ArrowLeft":
                evt.preventDefault();
                if (prevInput) prevInput.focus();
        }
    }

    function handleChange(evt: any) {
        const value = evt.currentTarget.value;
        const index = parseInt(evt.currentTarget.dataset.index);
        const form = formRef.current as unknown as HTMLFormElement; // Type assertion to unknown and then HTMLFormElement
        if (isNaN(index) || form === null) return;

        let nextIndex = index + 1;
        let nextInput = form.querySelector(`.input-${nextIndex}`) as HTMLInputElement | null; // Conditional type assertion

        update(index, value[0] || "");
        if (value.length === 1) nextInput?.focus();
        else if (index < length - 1) {
            const split = value.slice(index + 1, length).split("");
            split.forEach((val: string) => {
                update(nextIndex, val);
                nextInput?.focus();
                nextIndex++;
                nextInput = form.querySelector(`.input-${nextIndex}`) as HTMLInputElement | null; // Conditional type assertion
            });
        }
    }


    function handleFocus(evt: any) {
        evt.currentTarget.select();
    }

    useEffect(() => {
        if (isSubmitted) {
            // Check validity if the form has been submitted
            const isValidCode = code.every((value) => value !== "");
            setIsValid(isValidCode);
        }
    }, [code]);

    async function handleSubmit(evt: any) {
        evt.preventDefault();
        setIsSubmitted(true);
        if (isValid) {
            const codeValue = code.join("");
            alert(`Code is ${codeValue}`);
        }
    }

    return (
        <Stack
            component={"fieldset"}
            border={"none"}
            direction='column'
            justifyContent="center"
            alignItems="center"
            spacing={3}
        >

            <AuthFormTitle title={"Sign Up"} />

            <Box
                component="form"
                ref={formRef}
                onSubmit={handleVerify}
                noValidate
                bgcolor="white"
                p={{ xs: 4, md: 6 }}
                borderRadius="16px"
                boxShadow={3}
                height={{ xs: '40vh', md: '45vh' }}
                width={{ xs: '75%', md: '110%' }}

            >

                <Typography mb={2.5}>
                    Activation code was sent to your email
                    <br />
                    <Box component={"strong"} color={"primary.main"}>
                        Email
                    </Box>
                </Typography>
                <Stack
                    component={"fieldset"}
                    border={"none"}
                    direction={"row"}
                    spacing={1.2}
                    justifyContent={"center"}
                >
                    {code.map((value, i) => (
                        <VerificationInput
                            key={i}
                            value={value}
                            error={isSubmitted && !isValid}
                            inputProps={{
                                type: "number",
                                className: `input-${i}`,
                                "aria-label": `Number ${i + 1}`,
                                "data-index": i,
                                pattern: "[0-9]*",
                                inputtype: "numeric",
                                onChange: handleChange,
                                onKeyDown: handleKeyDown,
                                onFocus: handleFocus,
                            }}
                        />
                    ))}
                </Stack>
                <Box textAlign="center" mt={2.5}>
                    <LoadingButton
                        type="submit"
                        size="large"
                        variant="contained"
                        sx={{ paddingX: (theme: any) => theme.spacing(8) }}
                        disabled={!isValid}
                    >
                        Confirm
                    </LoadingButton>
                </Box>
                <Box mt={2.5} textAlign="center">
                    <Typography>
                        <Box component="span">
                            Didn&apos;t receive the code?
                        </Box>
                        &nbsp;
                        <Link href="/auth/register">Resend</Link>
                    </Typography>
                </Box>
            </Box>
        </Stack>
    );
};

export default CodeVerificationUI;
