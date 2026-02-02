import { Button, Modal, Box, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useApi } from "contexts/ApiContext";
import { useAuth } from "contexts/AuthContext";


function AuthModal({ open, onClose }) {
    const [username, setUsername] = useState("")
    const { SERVER_URL } = useApi()
    const { login } = useAuth()

    const onSubmit = () => {
        axios.post(`${SERVER_URL}/create/user`, {
            username: username
        }).then(response => {
            if (response.data.id) {
                login(response.data.id)
                if (onClose) onClose()
            }
        }).catch(error => {
            console.log("error: ", error)
        })
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                height: 200,
                bgcolor: 'background.paper',
                boxShadow: 24,
                color: 'black',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
            }}>
                <TextField
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    label="Username"
                    variant="outlined"
                    sx={{ width: '100%', maxWidth: 400 }}
                />
                <Button variant="contained" onClick={onSubmit}>
                    Submit
                </Button>
            </Box>
        </Modal>
    )
}

export default AuthModal