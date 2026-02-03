import { Container, Typography, Box } from '@mui/material';
import RankingCard from 'components/rankings/RankingCard'
import 'components/rankings/MyRankingsPage.css'
import React, { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useApi } from 'contexts/ApiContext';

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
})

export default function MyRankingsPage() {
    const { SERVER_URL } = useApi();
    const { userId } = useAuth();
    const [dataItems, setDataItems] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/tier-lists/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                // Always check if the response is okay (status 200-299)
                if (!response.ok) {
                    console.log(`HTTP error ${response.status}`)
                }

                const data = await response.json();
                setDataItems(data)
            } catch (err) {
                console.log(err.message)
            }
        };

        fetchUsers();
    }, [SERVER_URL, userId]);


    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h3" fontWeight="bold">
                    My Rankings
                </Typography>

                {/* Adds whitespace*/}
                <div style={{ padding: "10px", paddingTop: "10px" }}>
                    <p></p>
                </div>


                <div className="vertical-stack">

                    {dataItems.map(key => (
                        <div>
                            <div className="centered-horizontally">
                                <RankingCard title={key.template_name} body={DATE_FORMATTER.format(new Date(key.created_at))} />
                            </div>

                            <div style={{ paddingTop: "5px" }}>
                                <p></p>
                            </div>
                        </div>
                    ))}

                </div>

            </Box>
        </Container>
    );
}
