import Card from 'react-bootstrap/Card';
import "components/rankings/RankingCard.css"

function RankingCard(props){
    return (
        <Card style={{ width: '40rem', borderRadius: '15px', border: "1.5px solid black"}} >
            <div style={{ display: "flex"}}>
                <div style={{flex: 1}}>
                    <p className="text-start category-name">  {props.title}</p>
                    <p className="text-start category-text">  {props.body}</p>
                </div>
                <div style={{flex:1}}>
                    <button className="card-button" style={{margin:'25px 20px 0px 0'}}> View </button>
                    <button className="card-button" style={{width: "8rem", height: "2.6rem"}}> Compare </button>
                </div>
            </div>
        </Card>
    );
}

export default RankingCard
