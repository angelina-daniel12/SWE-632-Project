import { Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h3" fontWeight="bold">
                    Home Page
                </Typography>
                <Typography variant="h5" sx={{ mt: 2 }}>
                    Welcome to MetaTier!
                </Typography>
                <Typography variant="h5" sx={{ mt: 2 }}>
                    An application to create, save and compare tier ranking lists.
                </Typography>
                {/* Start exploring: links to /templates */}
                <Typography
                    component={Link}
                    to="/templates"
                    variant="h5"
                    sx={{ mt: 4 }}>
                    Get started
                </Typography>
            </Box>
        </Container>
    );
}