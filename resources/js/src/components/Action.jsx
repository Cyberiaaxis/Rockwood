import React from "react";
import "../styles/Communication.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ReportIcon from "@mui/icons-material/Report";
import Tooltip from "@mui/material/Tooltip";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

export default function Action() {
  return (
    <React.Fragment>
      <div className="communicationContainer">
        <p>
          <Tooltip title="Mail">
            <PersonAddIcon />
          </Tooltip>
        </p>
        <p>
          <Tooltip title="Forums">
            <PersonRemoveIcon />
          </Tooltip>
        </p>
        <p>
          <Tooltip title="Chat">
            <ReportIcon />
          </Tooltip>
        </p>
        <p>
          <Tooltip title="Chat">
            <QueryStatsIcon />
          </Tooltip>
        </p>
        <p>
          <Tooltip title="Chat">
            <CurrencyExchangeIcon />
          </Tooltip>
        </p>
      </div>
    </React.Fragment>
  );
}
