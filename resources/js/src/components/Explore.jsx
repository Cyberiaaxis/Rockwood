import * as React from "react";
import Box from "@mui/material/Box";
import "../styles/Explore.css";

export default function Explore({ setPage }) {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 360,
          bgcolor: "transparent"
        }}
      >
        <ul>
          <li className="head">CITY CENTER</li>
          <li>Chronicle Archives</li>
          <li>City Hall</li>
          <li>Community Center</li>
          <li>Jail</li>
          <li>Hospital</li>
          <li>Player Committee</li>
          <li>Staff</li>
          <li>Visitor Center</li>
        </ul>
        <ul>
          <li className="head">FINANCIAL</li>
          <li onClick={() => setPage("savings")}>Savings</li>
          <li>Donator House</li>
          <li onClick={() => setPage("gang")}>Messaging Inc</li>
          <li>Stock Market</li>
        </ul>
        <ul>
          <li className="head">EAST SIDE</li>
          <li>Big Al's Gun Shop</li>
          <li>Bits 'n' Bobs</li>
          <li>Cyber Force</li>
          <li>Docks</li>
          <li>Estate Agents</li>
          <li>Office Super Store</li>
          <li>Sweet Shop</li>
          <li>Jewelry Store</li>
          <li>Nikeh Sports</li>
          <li>Token Shop</li>
          <li>Docks</li>
          <li>Pharmacy Post</li>
          <li>Pawn Shop</li>
          <li>TC Clothing</li>
        </ul>
        <ul>
          <li className="head">Mysterious</li>
          <li>Celebrity Beat-down</li>
          <li>Mate Hookup</li>
          <li>Homies Requests</li>
          <li>Death Row</li>
        </ul>
      </Box>
      <Box
        sx={{
          padding: 0,
          display: "flex",
          width: "100%",
          maxWidth: 360,
          bgcolor: "transparent"
        }}
      >
        <ul>
          <li className="head">WEST SIDE</li>
          <li>Education</li>
          <li>Sports Science Lab</li>
          <li>Travel Agency</li>
        </ul>
        <ul>
          <li className="head">NORTH SIDE</li>
          <li>Auction House</li>
          <li>Church</li>
          <li>Item Market</li>
          <li>Points Building</li>
          <li>Points Market</li>
        </ul>
        <ul>
          <li className="head">RED-LIGHT</li>
          <li>Casino</li>
          <li>Dump</li>
          <li>Loan Shark</li>
          <li>Missions</li>
          <li>Raceway</li>
        </ul>
        <ul>
          <li className="head">RESIDENTIAL</li>
          <li>Your Private Island</li>
        </ul>
      </Box>
    </React.Fragment>
  );
}
