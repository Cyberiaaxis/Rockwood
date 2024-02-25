import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Styled component for decorative line
const Line = () => <hr style={{ width: "100px", border: "1px solid #ccc", margin: "20px 0" }} />;

const Discussions = () => {
    // Example discussion topics
    const discussionTopics = [
        "Favorite RPG characters",
        "Best strategies for boss fights",
        "Discussion on magic systems",
        "Tips for leveling up quickly",
        "Share your in-game screenshots",
        // Add more discussion topics as needed
    ];

    return (
        <Box textAlign="center" py={5}>
            <Typography variant="h4" gutterBottom>
                Discussions
            </Typography>
            <Line />
            <Box maxHeight="300px" overflowY="auto">
                {discussionTopics.map((topic, index) => (
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
            </Box>
        </Box>
    );
};

export default Discussions;
