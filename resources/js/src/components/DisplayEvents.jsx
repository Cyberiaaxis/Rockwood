import React, { useState, useEffect } from 'react';
import { useElementSize } from './useElementSize';
import { Box } from '@mui/material';
import EventTooltips from './EventTooltips';
import axios from 'axios';

export default function DisplayEvent({ events }) {
    const { width, height, ref } = useElementSize();

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
            <EventTooltips fieldWidth={width} fieldHeight={height} events={events} />
        </Box>
    );
}
