import { Box, Chip, Icon, IconButton } from '@mui/material';
import { Clear } from '@mui/icons-material';

function RankingItemCard({ title }) {

    return (
        <Box>
            <Chip
                label={title}
                deleteIcon={<Clear />}
                onDelete={() => {
                    console.log('delete');
                }}
                sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '& .MuiChip-deleteIcon': {
                        color: 'white',
                    },
                }}
            />
        </Box>
    )
}

export default RankingItemCard;