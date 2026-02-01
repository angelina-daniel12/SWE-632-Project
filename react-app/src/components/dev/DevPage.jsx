import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function DevPage() {
    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h3" fontWeight="bold">
                    Developer Tools Page
                </Typography>
                <Button
                    component={Link}
                    to="/dev/new-template"
                    variant="contained"
                    sx={{ mt: 4, fontFamily: 'Poppins, sans-serif' }}>
                    Create New Template
                </Button>
                <Button
                    component={Link}
                    to="/dev/new-items"
                    variant="contained"
                    sx={{ mt: 4, fontFamily: 'Poppins, sans-serif' }}>
                    Create New Items
                </Button>
            </Box>
        </Container>
    );
}
