import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

export default function NavButton({ title, path, locked = false }) {
    return (
        <Button
            component={Link}
            to={locked ? undefined : path}
            color="inherit"
            sx={{
                fontWeight: 500,
                fontFamily: 'Poppins, sans-serif',
                cursor: locked ? 'not-allowed' : 'pointer'
            }}
            startIcon={locked ? <LockIcon fontSize="small" /> : null}
        >
            {title}
        </Button>
    );
}