
import RankModal from "../components/RankModal";
import { useState } from "react";
import { Button } from "@mui/material";

function Home() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <h1>Home</h1>
            <Button onClick={() => setOpen(true)}>Open Modal</Button>
            <RankModal open={true} handleClose={() => setOpen(false)} />
        </div>
    )
}

export default Home;