import { AppBar, Toolbar, Box } from '@mui/material';
import NavLogo from 'components/nav/NavLogo.js';
import NavButton from 'components/nav/NavButton.js';

export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <NavLogo />

                {/* Navigation Buttons */}
                <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                    <NavButton title="Daily" path="/daily" locked={true} />
                    <NavButton title="Explore" path="/templates" />
                    <NavButton title="My Rankings" path="/my-rankings" />
                </Box>
            </Toolbar>
        </AppBar>
    );
}