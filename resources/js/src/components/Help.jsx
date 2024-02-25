import React from "react";
import Typography from '@mui/material/Typography';
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

const Help = () => {
    // Example help content
    const helpContent = [
        "How to get started with our RPG game",
        "Tips and tricks for leveling up quickly",
        "Understanding game mechanics and controls",
        "Frequently asked questions (FAQs)",
        // Add more help topics as needed
    ];

    return (
        <Box textAlign="center" py={5}>
            <Typography variant="h4" gutterBottom>
                Help
            </Typography>
            <Line />
            <ScrollingContainer>
                {helpContent.map((topic, index) => (
                    <Box key={index} mb={2}>
                        <Typography variant="subtitle1" color="primary">
                            {topic}
                        </Typography>
                        <Typography variant="body2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                            cursus lacinia ipsum, ac tempus leo varius nec. Nulla facilisi.
                            Nullam in ligula vel lectus lacinia feugiat.
                        </Typography>
                    </Box>
                ))}
            </ScrollingContainer>
        </Box>
    );
};

export default Help;
