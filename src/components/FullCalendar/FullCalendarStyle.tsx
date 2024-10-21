import React from "react";
import {useTheme} from "@mui/system";

export default function FullCalendarStyle(){
    const muiTheme = useTheme();

    return (
        <>
            <style jsx global>{`
                .fc-daygrid-day,
                .fc-event,
                .fc-daygrid-day-top,
                .fc-timegrid-slot,
                .fc-timegrid-axis-cushion {
                    cursor: pointer;
                }

                :root {
                    --fc-page-bg-color: ${muiTheme.palette.background.paper};
                    --fc-neutral-text-color: ${muiTheme.palette.text.secondary};
                    --fc-border-color: ${muiTheme.palette.divider};
                    --fc-button-text-color: ${muiTheme.palette.primary.contrastText};
                    --fc-button-bg-color: ${muiTheme.palette.primary.main};
                    --fc-button-border-color: ${muiTheme.palette.primary.main};
                    --fc-button-hover-bg-color: ${muiTheme.palette.primary.dark};
                    --fc-button-hover-border-color: ${muiTheme.palette.primary.dark};
                    --fc-button-active-bg-color: ${muiTheme.palette.primary.dark};
                    --fc-button-active-border-color: ${muiTheme.palette.primary.dark};
                    --fc-event-bg-color: ${muiTheme.palette.primary.light};
                    --fc-event-border-color: ${muiTheme.palette.primary.light};
                    --fc-event-text-color: ${muiTheme.palette.primary.contrastText};
                    --fc-more-link-bg-color: ${muiTheme.palette.action.hover};
                    --fc-bg-event-color: ${muiTheme.palette.success.light};
                    --fc-highlight-color: ${muiTheme.palette.info.light};
                    --fc-today-bg-color: ${muiTheme.palette.action.selected};
                    --fc-now-indicator-color: ${muiTheme.palette.error.main};
                }
            `}</style>
        </>
    );
}