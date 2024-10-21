import React, {useEffect} from 'react'
import {useImmerReducer} from "use-immer";
import {TutorAvailability} from "@/lib/tutorAvailability";
import {Grid} from "@mui/material";
import {AvailabilityDay} from "@/components/parts/tutor/subcomponents/AvailabilityDay";

type Props = {
    initialAvailabilityState?: TutorAvailability.AvailabilityState;
    onAvailabilityChange: (availability: TutorAvailability.AvailabilityState) => void;
}

const Availability = ({initialAvailabilityState: initialState, onAvailabilityChange}: Props) => {
    const [state, dispatch] = useImmerReducer(TutorAvailability.reducer, initialState ? initialState.availability : TutorAvailability.initialState);

    useEffect(() => {
        onAvailabilityChange({availability: state, isValid: true});
    }, [state]);

    return (
        <TutorAvailability.DispatchProvider value={dispatch}>
            <Grid container spacing={3}>
                {Object.entries(state).map(([day, dayState]) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={day}>
                        <AvailabilityDay day={day} state={dayState}/>
                    </Grid>
                ))}
            </Grid>
        </TutorAvailability.DispatchProvider>
    );
}

export default Availability