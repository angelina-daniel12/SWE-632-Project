import { AppBar, Toolbar, Box } from '@mui/material';
import NavLogo from 'components/nav/NavLogo.jsx';
import NavButton from 'components/nav/NavButton.jsx';
import ProfileLogo from 'components/nav/ProfileLogo.jsx';
import { useAuth } from 'contexts/AuthContext';

export default function Navbar() {
    const { isAuthenticated } = useAuth();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <NavLogo />

                {/* Navigation Buttons */}
                <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                    <NavButton title="Global" path="/global" />
                    <NavButton title="Explore" path="/templates" />
                    <NavButton title="My Rankings" path="/my-rankings" />
                    {isAuthenticated && <ProfileLogo />}
                </Box>
            </Toolbar>
        </AppBar>
    );
}