import React from "react";
import "../styles/Communication.css";
import EmailIcon from "@mui/icons-material/Email";
import ForumIcon from "@mui/icons-material/Forum";
import ChatIcon from "@mui/icons-material/Chat";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

export default function Communication() {
  return (
    <React.Fragment>
      <div className="communicationContainer">
        <p>
          <Tooltip title="Mail">
            <EmailIcon />
          </Tooltip>
        </p>
        <p>
          <Tooltip title="Forums">
            <ForumIcon />
          </Tooltip>
        </p>
        <p>
          <Tooltip title="Chat">
            <ChatIcon />
          </Tooltip>
        </p>
      </div>
    </React.Fragment>
  );
}
