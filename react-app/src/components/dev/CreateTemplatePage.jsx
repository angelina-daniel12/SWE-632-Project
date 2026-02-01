import {
    Container,
    Typography,
    Box,
    Button,
    TextField
} from '@mui/material';
import { useState } from 'react';
import { useApi } from 'contexts/ApiContext';
import axios from 'axios';

export default function CreateTemplatePage() {
    const { SERVER_URL } = useApi();

    const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    // const [category, setCategory] = useState('');

    return (
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column' }}>
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

            <TextField
                fullWidth
                placeholder='Template Name'
                sx={{ mt: 4, bgcolor: 'white' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            {/* TODO description field */}

            {/* TODO category field */}

            {/* Submit button */}
            <Button
                variant="contained"
                sx={{ mt: 4, fontFamily: 'Poppins, sans-serif' }}
                disabled={!name.trim()}
                onClick={() => publishTemplate(SERVER_URL, name)}
            >
                Publish Template
            </Button>
        </Container>
    );
}

const publishTemplate = ( serverUrl, templateName ) => {
    axios.post(`${serverUrl}/create/template`, {
        name: templateName
    }).then((response) => {
        console.log("Template created successfully:", response.data);
        alert(`Template "${templateName}" created successfully!`);
        window.location.reload();
    }).catch((error) => {
        console.error("Error creating template:", error);
        alert("Failed to create template. Please try again.");
    });
};