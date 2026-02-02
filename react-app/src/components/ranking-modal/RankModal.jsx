import { Modal, Box, Alert, IconButton, Button } from '@mui/material';
import { Clear, Check, Error } from '@mui/icons-material';

import RankingList from './RankingList';
import { useEffect, useState } from 'react';
import { useApi } from "contexts/ApiContext"
import { useAuth } from "contexts/AuthContext"
import axios from "axios";


const initialTiers = {
    "unranked": [],
    "S": [],
    "A": [],
    "B": [],
    "C": [],
    "D": [],
    "E": [],
    "F": []
}

function normalizeTiers(tiers) {
    const normalizedPayload = []
    Object.entries(tiers).forEach(([key, value]) => {
        value.forEach(item => {
            normalizedPayload.push({
                "item_id": item.id,
                tier: key,
                position: value.indexOf(item)
            })
        })
    })
    return normalizedPayload;
}

function RankModal({ open, handleClose, templateId }) {
    const { SERVER_URL } = useApi();
    const { userId } = useAuth();

    const [tiers, setTiers] = useState(initialTiers);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleSubmit = () => {
        if (tiers["unranked"].length > 0) {
            setError("Please assign all items to a tier")
            return
        }

        axios.post(`${SERVER_URL}/create/tier-list`, {
            "user_id": userId,
            "template_id": templateId,
            "item_rankings": normalizeTiers(tiers)
        }).then(response => {
            console.log("response", response.data)
            setSuccess("Ranking Saved")
            setTimeout(() => handleClose(), 5000)
        }).catch(error => {
            setError(error.message);
        })
    }

    useEffect(() => {
        setTimeout(() => setSuccess(""), 5000)
    }, [success])

    useEffect(() => {
        setTimeout(() => setError(""), 5000)
    }, [error])


    const onClose = () => {
        setTiers(initialTiers);
        handleClose();
    }


    useEffect(() => {
        if (!open) return;

        axios.get(`${SERVER_URL}/templates/${templateId}`, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        }).then(response => {
            console.log("data", response.data)
            setTiers({
                "unranked": response.data.items,
                "S": [],
                "A": [],
                "B": [],
                "C": [],
                "D": [],
                "E": [],
                "F": []
            })
        }).catch(error => {
            setError(error.message);
        });
    }, [open]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 700,
                bgcolor: 'background.paper',
                boxShadow: 24,
                color: 'black',
                p: 4,
            }}>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                    >
                    <Clear />
                </IconButton>
                <h2 style={{ textAlign: 'center' }}>Today's Topic</h2>
                {success !== "" && (<Alert severity="success" icon={<Check fontSize="inherit" />}>{success}</Alert>)}
                {error !== "" && (<Alert severity="error" icon={<Error fontSize="inherit" />}>{error}</Alert>)}
                <RankingList tiers={tiers} setTiers={setTiers} />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#828282',
                            '&:hover': {
                                backgroundColor: '#313131',
                            }
                        }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default RankModal;