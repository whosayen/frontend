import React, { useCallback, useState } from 'react';
import { Badge, Box, Button, IconButton, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import {PhotoState} from "@/components/parts/tutor/RegistrationStepper";

interface PhotoProps {
    state: PhotoState;
    onChange: (state: PhotoState) => void;
}

const Photo: React.FC<PhotoProps> = ({ state, onChange}) => {
    const [file, setFile] = useState<File | null>(null);
    const [previewSrc, setPreviewSrc] = useState(state.photoUrl || '');

    const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.target.files ? event.target.files[0] : null;
        if (newFile && (newFile.type === 'image/jpeg' || newFile.type === 'image/png') && newFile.size <= 5242880) {
            setFile(newFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result as string);
                onChange({photoUrl: reader.result as string, isValid: true});
            };
            reader.readAsDataURL(newFile);
        } else {
            alert('Invalid file type or size. Only JPEG or PNG formats under 5MB are allowed.');
        }
    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const newFile = event.dataTransfer.files ? event.dataTransfer.files[0] : null;
        if (newFile && (newFile.type === 'image/jpeg' || newFile.type === 'image/png') && newFile.size <= 5242880) {
            setFile(newFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result as string);
                onChange({photoUrl: reader.result as string, isValid: true});
            };
            reader.readAsDataURL(newFile);
        } else {
            alert('Invalid file type or size. Only JPEG or PNG formats under 5MB are allowed.');
        }
    }, [onChange]);

    const handleDelete = () => {
        setFile(null);
        setPreviewSrc('');
        onChange({photoUrl: '', isValid: false})
    };

    return (
        <Box sx={{ textAlign: 'center', p: 8 }}>
            <input
                accept="image/jpeg, image/png"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleUploadClick}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                    Upload Photo
                </Button>
            </label>
            <Typography variant="subtitle1" sx={{ m: 2 }}>or</Typography>
            <Box
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
                sx={{
                    border: '1px solid grey',
                    p: 3,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    minHeight: 200,
                    width: '60%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                }}
            >
                {previewSrc ? (
                    <Badge
                        badgeContent={
                            <IconButton color="error" size="small" onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        }
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <img src={previewSrc} alt="Preview" style={{ maxWidth: '90%', maxHeight: '150px', display: 'block' }} />
                    </Badge>
                ) : (
                    <>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <CloudUploadIcon style={{ fontSize: 60 }} />
                        </IconButton>
                        <Typography variant="subtitle1">Drag and drop your image here</Typography>
                        <Typography variant="caption">JPG or PNG format | Maximum 5MB file size</Typography>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Photo;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, {useCallback, useState} from 'react';
// import {Badge, Box, Button, IconButton, Typography} from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import DeleteIcon from '@mui/icons-material/Delete';
//
// const Photo = () => {
//     const [file, setFile] = useState(null);
//     const [previewSrc, setPreviewSrc] = useState('');
//
//     const handleUploadClick = (event: any) => {
//         const newFile = event.target.files[0];
//         if (newFile && (newFile.type === 'image/jpeg' || newFile.type === 'image/png') && newFile.size <= 5242880) {
//             setFile(newFile);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreviewSrc(reader.result as string);
//             };
//             reader.readAsDataURL(newFile);
//         } else {
//             console.error('Invalid file type or size');
//         }
//     };
//
//     const handleDrop = useCallback((event: any) => {
//         event.preventDefault();
//         const newFile = event.dataTransfer.files[0];
//         if (newFile && (newFile.type === 'image/jpeg' || newFile.type === 'image/png') && newFile.size <= 5242880) {
//             setFile(newFile);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreviewSrc(reader.result as string);
//             };
//             reader.readAsDataURL(newFile);
//         } else {
//             console.error('Invalid file type or size');
//         }
//     }, []);
//
//     const handleDelete = () => {
//         setFile(null);
//         setPreviewSrc('');
//     };
//
//
//     return (
//         <Box sx={{textAlign: 'center', p: 8}}>
//             <input
//                 accept="image/jpeg, image/png"
//                 style={{display: 'none'}}
//                 id="raised-button-file"
//                 multiple
//                 type="file"
//                 onChange={handleUploadClick}
//             />
//             <label htmlFor="raised-button-file">
//                 <Button variant="contained" component="span">
//                     Upload Photo
//                 </Button>
//             </label>
//             <Typography variant="subtitle1" sx={{m: 2}}>or</Typography>
//             <Box
//                 onDrop={handleDrop}
//                 onDragOver={(event) => event.preventDefault()}
//                 sx={{
//                     border: '1px solid grey',
//                     p: 3,
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     minHeight: 200, // Increase the height to make it longer
//                     width: '60%', // Adjust the width as needed
//                     display: 'flex',
//                     flexDirection: 'column', // Display children in a column
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     margin: '0 auto', // Center the box horizontally
//                 }}
//             >
//                 {previewSrc ? (
//                     <Badge
//                         badgeContent={
//                             <IconButton color="error" size="small" onClick={handleDelete}>
//                                 <DeleteIcon/>
//                             </IconButton>
//                         }
//                         anchorOrigin={{
//                             vertical: 'top',
//                             horizontal: 'right',
//                         }}
//                     >
//                         <img src={previewSrc} alt="Preview"
//                              style={{maxWidth: '90%', maxHeight: '150px', display: 'block'}}/>
//                     </Badge>
//                 ) : (
//                     <>
//                         <IconButton color="primary" aria-label="upload picture" component="span">
//                             <CloudUploadIcon style={{fontSize: 60}}/>
//                         </IconButton>
//                         <Typography variant="subtitle1">Drag and drop your image here</Typography>
//                         <Typography variant="caption">JPG or PNG format | Maximum 5MB file size</Typography>
//                     </>
//                 )}
//             </Box>
//         </Box>
//     );
// };
//
// export default Photo