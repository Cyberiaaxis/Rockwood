import * as React from "react";
import Box from "@mui/material/Box";
import "../styles/Explore.css";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Typography } from "@mui/material";
import { Home } from "@mui/icons-material";


export default function Explore({ setPage }) {


  const menuitems = [
    {
      header: 'West Side',
      items: [
        {
          id: 'home',
          text: 'Home',
          url: '/',
          icon: <Home />
        }
      ],
    },
    {
      header: 'North Side',
      items: [
        {
          id: 'home',
          text: 'Market',
          url: '/',
          icon: <Home />
        }
      ],
    },
    {
      header: 'East Side',
      items: [
        {
          id: 'home',
          text: 'Garden',
          url: '/',
          icon: <Home />
        }
      ],
    },
    {
      header: 'South Side',
      items: [
        {
          id: 'home',
          text: 'Jai ho',
          url: '/',
          icon: <Home />
        }
      ],
    },
  ]


  return (
    <React.Fragment>
      <Box display="flex" justifyContent="flex-start">Pakistan-Krachi(Rally Wala) </Box>
      <Box className="wrapper">
        {menuitems.map((x, i) =>
          <Box key={i}>
            <Typography component="h6" className="head">{x.header}</Typography>
            {x.items.map((x, i) => <List key={i}>
              <ListItem>
                <ListItemIcon>
                  {x.icon}
                </ListItemIcon>
                <ListItemText primary={x.text} />
              </ListItem>
            </List>)}
          </Box>
        )}
      </Box>

    </React.Fragment>
  );
}

// https://www.npmjs.com/package/image-to-ascii