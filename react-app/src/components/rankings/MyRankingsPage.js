import { Container, Typography, Box } from '@mui/material';
import RankingCard from 'components/rankings/RankingCard'
import 'components/rankings/MyRankingsPage.css'


export default function MyRankingsPage() {
    const dataItems = {
        'Fruits':'Rank your favorite fruits',
        'Movies':'Rank your favorite movies',
        'Sports':'Find which sports are most popular',
    };
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

                    {Object.keys(dataItems).map(key => (
                        <div>
                            <div className="centered-horizontally">
                                <RankingCard title={key} body={dataItems[key]} />
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
