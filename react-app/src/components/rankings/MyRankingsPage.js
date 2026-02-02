import { Container, Typography, Box } from '@mui/material';
import RankingCard from 'components/rankings/RankingCard'
import 'components/rankings/MyRankingsPage.css'
import React, { useState, useEffect } from 'react';

export default function MyRankingsPage() {
    const [dataItems, setDataItems] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch('https://interadditive-benny-matrilineal.ngrok-free.dev/tier-lists/2',{
                headers:{
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
            console.log(dataItems)
          } catch (err) {
            console.log(err.message)
          } 
        };

        fetchUsers();
    }, [dataItems]);


    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h3" fontWeight="bold">
                    My Rankings Page
                </Typography>

                {/* Adds whitespace*/}
                <div style={{padding: "10px", paddingTop: "10px"}}>
                    <p></p>
                </div>

                
                <div className="vertical-stack">

                    {dataItems.map(key => (
                        <div>
                            <div className="centered-horizontally">
                                <RankingCard title={key.template_name} body="Lorem ipsum dolor sit amet" />
                            </div>

                            <div style={{paddingTop: "5px"}}>
                                <p></p>
                            </div>
                        </div>
                    ))}

                </div>

            </Box>
        </Container>
    );
}
