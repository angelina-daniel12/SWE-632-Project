import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useApi } from "contexts/ApiContext";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import ItemCard from "components/explore/ItemCard";

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
    if (error) return <div>Error loading template: {error}</div>;
    if (!template) return <div>Template not found</div>;

    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h3" fontWeight="bold">
                    {template.template_name} Tier Creation Page
                </Typography>
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
                    {template.items.map((item) => (
                        <ItemCard key={item.id} item={item} templateId={templateId} />
                    ))}
                </Box>
            </Box>
        </Container>
    );
}
