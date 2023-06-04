import React, { useState, useEffect } from 'react';
import { useElementSize } from './useElementSize';
import { Box } from '@mui/material';
import EventTooltips from './EventTooltips'
// import AlbumIcon from "@mui/icons-material/Album";
import axios from 'axios';

export default function DisplayEvent({ events }) {
    // console.log("** events coming from DB", event);
    //const [boxes, setBoxes] = useState([]);
    // const [events, setEvents] = useState([]);
    // const [loading, setLoading] = useState(true);
    const { width, height, ref } = useElementSize();

    // async function fetchEvents() {
    //     try {
    //         const response = await axios.get("/welcome.json");
    //         console.log(response.data.results);
    //         setEvents(response.data.results);
    //         setLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(true);
    //     }
    // }

    // useEffect(() => {
    //     if (events.length === 0) {
    //         fetchEvents();
    //     }
    // }, [])
    console.log("** after useEffect events **", events)
    return (
        <Box
            ref={ref}
            sx={{
                flex: 1,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                minHeight: 300,
                minWidth: 200,
                height: 550,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {<EventTooltips fieldWidth={width} fieldHeight={height} events={events} />}
        </Box>
    );
}


