import React, {useEffect, useState} from 'react';
import { FormControl, Grid, TextField } from '@mui/material';
import {HourlyRateState} from "@/components/parts/tutor/RegistrationStepper";

type Props = {
    state: HourlyRateState; // Optional initial hourly rate
    onChange: (state: HourlyRateState) => void; // Callback when the rate changes
}

const HourlyRate: React.FC<Props> = ({ state, onChange }) => {
    const [rate, setRate] = useState<string>();

    useEffect(() => {
        setRate(state.rate.toString());
    }, [state]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRate = event.target.value;
        // Validate the new rate: simple validation to check if it's a number greater than 0
        if (!isNaN(Number(newRate)) && Number(newRate) > 0) {
            setRate(newRate);
            onChange({ rate: Number(newRate), isValid: true }); // Invoke callback with the new valid rate
        }
        else {
            setRate(newRate);
            onChange({ rate: Number(newRate), isValid: false }); // Invoke callback with the new invalid rate
        }
    };

    return (
        <React.Fragment>
            <Grid container spacing={2} alignItems="center" sx={{ padding: 2 }} maxWidth={300}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            name="hourlyRate"
                            label="Hourly Rate"
                            type="number" // Change type to number for appropriate input
                            margin="dense"
                            required
                            value={rate}
                            onChange={handleChange} // Handle changes to validate and update rate
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default HourlyRate;
