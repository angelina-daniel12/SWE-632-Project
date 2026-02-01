import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useApi } from "contexts/ApiContext";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import ItemCard from "components/explore/ItemCard";
import HelpIcon from '@mui/icons-material/Help';

export default function TemplatePage() {
    const { templateId } = useParams();
    const { SERVER_URL } = useApi();

    const [template, setTemplate] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${SERVER_URL}/templates/${templateId}`, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
            .then(response => {
                console.log(response.data)
                setTemplate(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [SERVER_URL, templateId]);

    if (isLoading) return <div>Loading template...</div>;
    if (error) return errorView(`Something went wrong: ${error}`);
    if (!template) return errorView("Template not found");

    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <>
                    <Typography variant="h2" fontWeight="bold">
                        {template.template_name}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                        Tier Ranking Page
                    </Typography>
                </>
                <Typography variant="h5" sx={{ mt: 2 }}>
                    {template.description}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 4
                }}>
                    {template.items.length === 0 && missingItemsView()}
                    {template.items.map((item) => (
                        <ItemCard key={item.id} item={item} templateId={templateId} />
                    ))}
                </Box>
            </Box>
        </Container>
    );
}

function missingItemsView() {
    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <HelpIcon sx={{ fontSize: 100, color: 'black', mt: 2, borderRadius: '10%' }} />
            <Typography variant="h5">Hmmm... there no items in this template.</Typography>
        </Box>
    );
}

function errorView(message) {
    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h5" color="error">
                    {message}
                </Typography>
            </Box>
        </Container>
    );
}