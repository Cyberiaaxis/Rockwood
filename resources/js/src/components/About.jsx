import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

// Styled component for decorative line
const Line = styled("hr")({
    width: "100px",
    border: "1px solid #ccc",
    margin: "20px 0",
});

const AboutUs = () => {
    return (
        <Box textAlign="center" py={5}>
            <Typography variant="h4" gutterBottom>
                About Our RPG Game
            </Typography>
            <Line />
            <Typography variant="body1" paragraph>
                Welcome to our RPG world! Immerse yourself in a fantastical realm where
                adventures await at every turn. Our RPG game brings together the
                excitement of storytelling, the thrill of exploration, and the
                strategic depth of tactical combat.
            </Typography>

            <Typography variant="body1" paragraph>
                Embark on epic quests, encounter mythical creatures, and uncover ancient
                mysteries. Whether you prefer to wield a sword as a valiant knight,
                cast powerful spells as a wise wizard, or sneak through the shadows as
                a cunning rogue, our RPG game offers endless possibilities for
                adventure.
            </Typography>
            <Typography variant="body1" paragraph>
                Join a community of fellow adventurers, form alliances, and forge
                unforgettable memories together. The journey awaits – will you answer
                the call to adventure?
            </Typography>
            <Typography variant="body1" paragraph>
                Start your epic quest today and become a legend in our RPG world!
            </Typography>
        </Box>
    );
};

export default AboutUs;
