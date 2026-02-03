import { useState, useEffect } from 'react';
import axios from 'axios';
import { useApi } from 'contexts/ApiContext';
import { Container, Typography, Box } from '@mui/material';
import TemplateCard from './TemplateCard';

import RankingModal from 'components/ranking-modal/RankModal';

export default function ExplorePage() {
    const { SERVER_URL } = useApi();

    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openRankingModal, setOpenRankingModal] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState(null);

    const handleModalClose = () => {
        console.log("modal closed, resetting state")
        setOpenRankingModal(false);
        setSelectedTemplateId(null);
    }

    useEffect(() => {
        axios.get(`${SERVER_URL}/templates`, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
            .then(response => {
                console.log("templates",response.data)
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
            <RankingModal open={openRankingModal} handleClose={handleModalClose} templateId={selectedTemplateId} />
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h3" fontWeight="bold">
                    Explore Templates
                </Typography>
                {templates.map(template => (
                    <TemplateCard template={template} onClick={() => {
                        setSelectedTemplateId(template.id);
                        setOpenRankingModal(true);
                    }} />
                ))}
            </Box>
        </Container>
    );
}