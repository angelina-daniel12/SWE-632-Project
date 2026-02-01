import {
    Container,
    Typography,
    Box,
    // Table,
    // Button,
    // TableContainer,
    // Paper,
    // TableRow,
    // TableBody,
    // TextField,
    // TableCell
} from '@mui/material';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import EngineeringIcon from '@mui/icons-material/Engineering';
// import { useState } from 'react';

export default function CreateItemsPage() {
    // const [itemName, setItemName] = useState('');
    // const [imageFile, setImageFile] = useState(null);

    // const handleFileChange = (event) => {
    //     const file = event.target.files?.[0];
    //     if (!file) return;

    //     if (file.type !== 'image/jpeg') {
    //         alert('Only JPG images are allowed');
    //         return;
    //     }

    //     setImageFile(file);
    // };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    textAlign: 'center',
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h3" fontWeight="bold">
                    Create New Template
                </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <EngineeringIcon sx={{ fontSize: 100, color: 'gold', bgcolor: 'black', mt: 2, borderRadius: '10%' }} />
                
                <Typography variant="h5" sx={{ mt: 4 }}>
                    This page is under construction.
                </Typography>
            </Box>

            {/* <TableContainer component={Paper} sx={{ mt: 6 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    placeholder="Item name"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </TableCell>

                            <TableCell>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{ fontFamily: 'Poppins, sans-serif', color: '#1976d2' }}
                                    startIcon={<AttachFileIcon />}
                                >
                                    {imageFile ? 'Change Image' : 'Attach Image'}
                                    <input
                                        type="file"
                                        accept="image/jpeg"
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                </Button>

                                {imageFile && (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            ml: 2,
                                            fontStyle: 'italic',
                                            fontFamily: 'Poppins, sans-serif'
                                        }}>
                                        {imageFile.name}
                                    </Typography>
                                )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> */}

            {/* Submit button */}
            {/* <Button
                variant="contained"
                sx={{ mt: 4, fontFamily: 'Poppins, sans-serif' }}
                onClick={() => publishTemplate({ itemName, imageFile })}
            >
                Publish Template
            </Button> */}
        </Container>
    );
}

// const publishTemplate = (itemName, imageFile) => {
//     // Function to handle publishing the new template
//     console.log("Publishing new template...", itemName, imageFile);
// };
