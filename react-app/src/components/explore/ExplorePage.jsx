import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useApi } from 'contexts/ApiContext';
import {
    Typography,
    Box,
    Chip,
    CircularProgress
} from '@mui/material';
import TemplateCard from '../shared/TemplateCard';
import RankingModal from 'components/ranking-modal/RankModal';

const CATEGORY_COLORS = {
    Music: "#534AB7",
    Animals: "#378ADD",
    Food: "#E24B4A",
    Events: "#EF9F27",
};

const DEFAULT_COLOR = "#FF7F7F";

export default function ExplorePage() {
    const { SERVER_URL } = useApi();

    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openRankingModal, setOpenRankingModal] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState(null);
    const [activeCategories, setActiveCategories] = useState(new Set());

    const handleModalClose = () => {
        setOpenRankingModal(false);
        setSelectedTemplateId(null);
    };

    const toggleCategory = (cat) => {
        setActiveCategories((prev) => {
            const next = new Set(prev);
            if (next.has(cat)) next.delete(cat);
            else next.add(cat);
            return next;
        });
    };

    useEffect(() => {
        axios
            .get(`${SERVER_URL}/templates`, {
                headers: { 'ngrok-skip-browser-warning': 'true' }
            })
            .then((response) => {
                setTemplates(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [SERVER_URL]);

    const categories = useMemo(() => {
        return [...new Set(templates.map((t) => t.category).filter(Boolean))].sort();
    }, [templates]);

    const filteredTemplates = useMemo(() => {
        if (activeCategories.size === 0) return templates;
        return templates.filter((t) => activeCategories.has(t.category));
    }, [templates, activeCategories]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={8}>
                <CircularProgress sx={{ color: DEFAULT_COLOR }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" mt={4} textAlign="center">
                Error loading templates: {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ minHeight: 'calc(100vh - 72px)', padding: '32px 16px' }}>
            <RankingModal
                open={openRankingModal}
                handleClose={handleModalClose}
                templateId={selectedTemplateId}
            />

            <Box sx={{ maxWidth: 900, margin: '0 auto' }}>
                <Typography sx={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>
                    Explore Templates
                </Typography>

                <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#6b7280', mb: 3 }}>
                    Browse and rank community-made templates.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '12px',
                            fontWeight: 1000,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#6b7280',
                            mr: 1,
                        }}
                    >
                        Filter
                    </Typography>

                    {categories.map((cat) => {
                        const isActive = activeCategories.has(cat);
                        const color = CATEGORY_COLORS[cat] ?? DEFAULT_COLOR;

                        return (
                            <Chip
                                key={cat}
                                label={cat}
                                onClick={() => toggleCategory(cat)}
                                variant={isActive ? 'filled' : 'outlined'}
                                sx={{
                                    borderColor: isActive ? color : '#d1d5db',
                                    backgroundColor: isActive ? color : 'transparent',
                                    color: isActive ? '#fff' : '#111827',
                                    fontWeight: 600,
                                    '&:hover': {
                                        backgroundColor: isActive ? color : 'transparent',
                                        borderColor: color,
                                        color: isActive ? '#fff' : color,
                                    },
                                }}
                            />
                        );
                    })}

                    {activeCategories.size > 0 && (
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: DEFAULT_COLOR,
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                ml: 1,
                            }}
                            onClick={() => setActiveCategories(new Set())}
                        >
                            Clear filters
                        </Typography>
                    )}
                </Box>

                <Typography sx={{ fontSize: '12px', color: '#6b7280', mb: 3 }}>
                    Showing {filteredTemplates.length}{' '}
                    {filteredTemplates.length === 1 ? 'result' : 'results'}
                </Typography>

                {filteredTemplates.length === 0 ? (
                    <Box textAlign="center" py={10}>
                        <Typography variant="body1" color="text.secondary">
                            No templates found for the selected categories.
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: 2,
                        }}
                    >
                        {filteredTemplates.map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                onClick={() => {
                                    setSelectedTemplateId(template.id);
                                    setOpenRankingModal(true);
                                }}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
