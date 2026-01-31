import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TemplateCard({ template }) {
    return (
        <Box
            component={Link}
            to={`/templates/${template.id}`}
            sx={{
                mt: 4,
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    borderColor: '#1976d2',
                }
            }}
        >
            <Typography variant="h5" fontWeight="bold">
                {template.name}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                {template.description}
            </Typography>
        </Box>
    );
}