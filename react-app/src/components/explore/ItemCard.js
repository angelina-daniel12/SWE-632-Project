import { Box, Typography } from '@mui/material';
import { useApi } from 'contexts/ApiContext';

export default function ItemCard({ item, templateId }) {
    const { SERVER_URL } = useApi();

    // Construct image URL based on template_id and item name
    // remove spaces from item name for URL
    const itemNameForUrl = getImageName(item.name);
    const imageUrl = `${SERVER_URL}/static/${templateId}/${itemNameForUrl}.jpg`;

    return (
        <Box
            sx={{
                position: 'relative',
                width: '200px',
                height: '200px',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 2,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.05)',
                }
            }}
        >
            {/* Background Image */}
            <Box
                component="img"
                src={imageUrl}
                alt={item.name}
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                }}
                onError={(e) => {
                    // Fallback if image doesn't exist
                    e.target.style.display = 'none';
                    e.target.parentElement.style.backgroundColor = '#ccc';
                }}
            />

            {/* Text Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    padding: 2,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none'
                    }}
                >
                    {capitalize(item.name)}
                </Typography>
            </Box>
        </Box>
    );
}

// remove all non-alphanumeric characters and spaces from name
const getImageName = (name) => {
    return name.replace(/[^a-zA-Z0-9]/g, '');
};

const capitalize = (str) => {
    return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
};