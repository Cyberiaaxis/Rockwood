import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import ForumIcon from "@mui/icons-material/Forum";
import ChatIcon from "@mui/icons-material/Chat";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Communication() {
    return (
        <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            p={0}
            margin={0}
        >
            <Button
                variant="text"
                startIcon={
                    <Tooltip title="Mail">
                        <EmailIcon sx={{ fontSize: 32 }} />
                    </Tooltip>
                }
            >
                <Typography variant="body2">Mail</Typography>
            </Button>
            <Button
                variant="text"
                startIcon={
                    <Tooltip title="Forums">
                        <ForumIcon sx={{ fontSize: 32 }} />
                    </Tooltip>
                }
            >
                <Typography variant="body2">Forums</Typography>
            </Button>
            <Button
                variant="text"
                startIcon={
                    <Tooltip title="Chat">
                        <ChatIcon sx={{ fontSize: 32 }} />
                    </Tooltip>
                }
            >
                <Typography variant="body2">Chat</Typography>
            </Button>
        </Box>
    );
}
