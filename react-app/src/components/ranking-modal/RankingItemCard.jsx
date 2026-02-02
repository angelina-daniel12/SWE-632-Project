import { Box, Chip, Icon, IconButton } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { draggable } from  '@atlaskit/pragmatic-drag-and-drop/element/adapter';

function RankingItemCard({ item, location, onMoveToUnranked }) {
    const ref = useRef(null);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        console.log("item", item)
        const el = ref.current;
        if (!el) return;

        return draggable({
            element: el,
            getInitialData: () => ({ location, item }),
            onDragStart: () => setDragging(true),
            onDrop: () => setDragging(false)
        })
    }, [location, item]);

    const handleDelete = () => {
        if (onMoveToUnranked) {
            onMoveToUnranked(item, location);
        }
    }

    return (
        <Box sx={{
            margin: "2px"
        }}>
            <Chip
                ref={ref}
                label={item.name}
                deleteIcon={<Clear />}
                onDelete={handleDelete}
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