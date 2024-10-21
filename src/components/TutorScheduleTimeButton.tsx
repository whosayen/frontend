import { ScheduleData } from "@/lib/types/clientTypes";
import { TimeIntervalType } from "@/lib/types/dtoTypes";
import { Button, ButtonProps, Tooltip } from "@mui/material";
import React from "react";

type TutorScheduleTimeButtonProps = {
    bookingType: ScheduleData['times'][0]['type'];
    time: string;
    onClick: () => void;
};

// Function to return the appropriate tooltip text based on booking type
const getTooltipText = (bookingType: TutorScheduleTimeButtonProps['bookingType']): string | undefined => {
    switch (bookingType) {
        case 'NOT_AVAILABLE':
            return undefined;
        case 'AVAILABLE':
            return undefined;
        case 'BOOKED':
            return 'This time slot has already been booked.';
        case 'BOOKED_BY_YOU':
            return 'You have already booked this time slot.';
        case 'YOU_ARE_NOT_AVAILABLE':
            return 'You are not available for this time slot.';
        case 'PASSED':
            return 'This time slot has already passed.';
        default:
            return undefined;
    }
};

export default function TutorScheduleTimeButton({
    bookingType,
    time,
    onClick
}: TutorScheduleTimeButtonProps) {
    const isAvailable = bookingType === 'AVAILABLE';

    let buttonSx: ButtonProps['sx'] = {
        opacity: isAvailable ? 1 : 0.8,
        transition: 'background-color 0.3s ease',
    };

    switch (bookingType) {
        case 'BOOKED':
            buttonSx = {
                ...buttonSx,
                "&.Mui-disabled": {
                    backgroundColor: '#f44336', // Red for booked
                    color: '#fff' // White text
                }
            };
            break;
        case 'BOOKED_BY_YOU':
            buttonSx = {
                ...buttonSx,
                "&.Mui-disabled": {
                    backgroundColor: '#2196f3', // Blue for booked by you
                    color: '#fff' // White text
                }
            };
            break;
        case 'YOU_ARE_NOT_AVAILABLE':
            buttonSx = {
                ...buttonSx,
                "&.Mui-disabled": {
                    backgroundColor: '#ff9800', // Orange for not available
                    color: '#fff' // White text
                }
            };
            break;
        case 'PASSED':
            buttonSx = {
                ...buttonSx,
                "&.Mui-disabled": {
                    backgroundColor: '#9e9e9e', // Grey for passed
                    color: '#fff', // White text
                    cursor: 'not-allowed' // No pointer for passed
                }
            };
            break;
        default:
            buttonSx = {
                ...buttonSx,
                "&.Mui-disabled": {
                    backgroundColor: '#e0e0e0', // Default grey for disabled
                    color: '#9e9e9e' // Grey text
                }
            };
            break;
    }

    // Get the tooltip text based on bookingType
    const tooltipText = getTooltipText(bookingType);

    return (
        <Tooltip title={tooltipText} arrow>
            <span style={{ display: 'inline-block' }}>
                <Button
                    variant="contained"
                    size="small"
                    disabled={!isAvailable}
                    sx={buttonSx}
                    onClick={onClick} // Call the onClick function when the button is clicked
                >
                    {time}
                </Button>
            </span>
        </Tooltip>
    );
}
