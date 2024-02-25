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
                About Us
            </Typography>
            <Line />
            <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vestibulum purus at erat hendrerit, nec malesuada turpis faucibus.
                Maecenas nec ipsum ut lorem pharetra auctor. Sed quis convallis est, at
                scelerisque dui.
            </Typography>
            <Avatar
                alt="Company Logo"
                src="/images/logo.jpg"
                sx={{ width: 200, height: 200, margin: "20px auto" }}
            />
            <Typography variant="body1" paragraph>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
                cubilia curae; Morbi vehicula, nisi a consectetur viverra, risus arcu
                scelerisque metus.
            </Typography>
            {/* Add more content as needed */}
        </Box>
    );
};

export default AboutUs;
