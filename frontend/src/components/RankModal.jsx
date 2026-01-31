import { Modal, Box, List, ListItem, ListItemText, Icon, IconButton } from '@mui/material';
import RankingItemCard from './RankingItemCard';
import { Clear } from '@mui/icons-material';

const tiers = [
    {
        title: "S Tier",
        movies: ["Interstellar", "Shutter's Island"]
    },
    {
        title: "A Tier",
        movies: ["Top Gun", "Oppenheimer"]
    },
    {
        title: "B Tier",
        movies: ["Now You Can See Me"]
    },
    {
        title: "C Tier",
        movies: ["The Matrix", "The Dark Knight"]
    },
    {
        title: "D Tier",
        movies: ["The Lord of the Rings", "The Hobbit"]
    },
    {
        title: "E Tier",
        movies: ["The Hangover", "The Wolf of Wall Street"]
    },
    {
        title: "F Tier",
        movies: ["Forrest Gump", "The Shawshank Redemption"]
    }
]

function RankingItem({ title, items }) {
    return (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {items.map((item) => (
                <RankingItemCard title={item} />
            ))}
        </Box>
    )
}

function RankingItemList({ title, items }) {
    return (
        <List>
            {items.map((item) => (
                <ListItem sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <ListItemText primary={item.title} />
                    <RankingItem title={item.title} items={item.movies} />
                </ListItem>
            ))}
        </List>
    )
}

function RankModal({ open, handleClose }) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Icon>
                <IconButton>
                    <Clear />
                </IconButton>    
            </Icon>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                color: 'black',
                p: 4,
            }}>
                <h2 style={{ textAlign: 'center' }}>Today's Topic</h2>
                <RankingItemList items={tiers} />
            </Box>
        </Modal>
    )
}

export default RankModal;