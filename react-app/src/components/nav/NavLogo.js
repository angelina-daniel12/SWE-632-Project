import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export default function NavLogo() {
    return (
        <Box
            component={Link}
            to="/"
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1,
                textDecoration: 'none'
            }}
        >
            <Box
                sx={{
                    height: '64px',
                    width: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                {/* Logo Image */}
                <img
                    src={process.env.PUBLIC_URL + '/logo192.png'}
                    alt="App Logo"
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover'
                    }}
                />
            </Box>
            {/* App Name */}
            <Typography
                variant="h6"
                component="div"
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: 'black',
                    marginLeft: '12px'
                }}
            >
                MetaTier
            </Typography>
        </Box>
    );
}