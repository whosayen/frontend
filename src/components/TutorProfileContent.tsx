import React from 'react';
import Typography from '@mui/material/Typography';
import LinearWithValueLabel from './common/LinearProgress';

type TutorProps = {};

const TutorProfileContent: React.FC<TutorProps> = (props) => {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'
        }}>
            <div style={{width: '70%', marginTop: '20px'}}>

                <LinearWithValueLabel/>
                <Typography variant="h5" style={{marginTop: '20px'}}>Age</Typography>
                <Typography variant="body1">30 years old</Typography>

                <Typography variant="h5" style={{marginTop: '20px'}}>Video Introduction</Typography>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet, diam sit amet ultricies
                    fermentum,
                    ligula sapien consequat mauris.
                </Typography>

                <Typography variant="h5" style={{marginTop: '20px'}}>Availability</Typography>
                <Typography variant="body1">
                    Available on Mondays from 9 AM to 5 PM.
                </Typography>
                {/* Add other availability details */}
            </div>
        </div>
    );
};

export default TutorProfileContent;
