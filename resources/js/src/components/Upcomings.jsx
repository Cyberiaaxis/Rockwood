import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

// Styled component for decorative line
const Line = styled("hr")({
    width: "100px",
    border: "1px solid #ccc",
    margin: "20px 0",
});

// Styled component for container with scrolling
const ScrollingContainer = styled(Box)({
    maxHeight: "300px", // Adjust the max height as needed
    overflowY: "auto",
});

const UpcomingEvents = () => {
    // Example upcoming events data
    const upcomingEvents = [
        {
            title: "The Dragon's Lair: Raid Event",
            date: "March 15, 2024",
            description:
                "Gather your party and embark on a perilous journey to slay the fearsome dragon that guards its lair. Epic loot awaits the brave!",
        },
        {
            title: "Wizard's Tower: Spellcasting Competition",
            date: "April 5, 2024",
            description:
                "Test your magical prowess in a thrilling spellcasting competition held at the ancient Wizard's Tower. Show off your arcane skills and win fantastic prizes!",
        },
        // Add more upcoming events as needed
    ];

    return (
        <Box textAlign="center" py={5}>
            <Typography variant="h4" gutterBottom>
                Upcoming Events
            </Typography>
            <Line />
            <ScrollingContainer>
                {upcomingEvents.map((event, index) => (
                    <Box key={index} mb={3}>
                        <Typography variant="h6">{event.title}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Date: {event.date}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {event.description}
                        </Typography>
                    </Box>
                ))}
            </ScrollingContainer>
        </Box>
    );
};

export default UpcomingEvents;
