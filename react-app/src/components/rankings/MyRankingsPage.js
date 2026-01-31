import { Container, Typography, Box } from '@mui/material';

export default function MyRankingsPage() {
    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h3" fontWeight="bold">
                    My Rankings Page
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Welcome to your saved rankings history!
                </Typography>
            </Box>
        </Container>
    );
}