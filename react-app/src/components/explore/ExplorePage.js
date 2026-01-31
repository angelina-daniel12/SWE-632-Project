import { useState, useEffect } from 'react';
import axios from 'axios';
import { useApi } from 'contexts/ApiContext';
import { Container, Typography, Box } from '@mui/material';
import TemplateCard from './TemplateCard';

export default function ExplorePage() {
    const { SERVER_URL } = useApi();

    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${SERVER_URL}/templates`, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
            .then(response => {
                setTemplates(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [SERVER_URL]);

    if (loading) return <div>Loading templates...</div>;
    if (error) return <div>Error loading templates: {error}</div>;

    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h3" fontWeight="bold">
                    Explore Templates
                </Typography>
                {templates.map(template => (
                    <TemplateCard template={template} />
                ))}
            </Box>
        </Container>
    );
}