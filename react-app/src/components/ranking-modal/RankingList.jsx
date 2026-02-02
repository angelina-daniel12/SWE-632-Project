import { useEffect, useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";

import RankingTier from "./RankingTier";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";


function renderTier(key, values, onMoveToUnranked) {
    if (key === "unranked") {
        return (
            <ListItem key={key}>
                <RankingTier items={values} location={key} onMoveToUnranked={onMoveToUnranked} />
            </ListItem>
        )
    }

    return (
        <ListItem key={key} sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            paddingBottom: "0px",
            paddingTop: "0px"
        }}>
            <h3 style={{ marginTop: 5, marginBottom: 5 }}>{key.toUpperCase()}-Tier</h3>
            <RankingTier title={key} items={values} location={key} onMoveToUnranked={onMoveToUnranked} />
        </ListItem>
    )
}

function RankingList({ tiers, setTiers }) {

    const handleMoveToUnranked = (movedItem, currentLocation) => {
        if (currentLocation === "unranked") {
            return; // Already in unranked, no need to move
        }
        
        setTiers(prevTiers => {
            const updatedItems = { ...prevTiers };
            updatedItems[currentLocation] = prevTiers[currentLocation].filter(item => item.name !== movedItem.name);
            updatedItems["unranked"] = [...prevTiers["unranked"], movedItem];
            return updatedItems;
        })
    }

    useEffect(() => {
        return monitorForElements({
            onDrop({ source, location }) {
                const destination = location.current.dropTargets[0];
                if (!destination) {
                    return;
                }

                const destinationLocation = destination.data?.location;
                const sourceLocation = source.data?.location;
                const sourceItem = source.data?.item;
                const sourceTitle = sourceItem.name;
                console.log("sourceTitle", sourceTitle)

                if (sourceLocation !== destinationLocation) {
                    setTiers(prevTiers => {
                        const updatedItems = { ...prevTiers };
                        updatedItems[sourceLocation] = prevTiers[sourceLocation].filter(item => item.name !== sourceTitle);
                        updatedItems[destinationLocation] = [...prevTiers[destinationLocation], sourceItem];
                        return updatedItems;
                    })
                }

            }
        })
    }, [])

    return (
        <List>
        {Object.entries(tiers).map(([key, values]) => renderTier(key, values, handleMoveToUnranked))}
        </List>
    )
}

export default RankingList;