import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from "@mui/material";
import { Home, Business, Storefront, LocalDining, FlightTakeoff, Archive, AccountBalance, People, ShoppingCart, MedicalServices } from "@mui/icons-material";

export default function Explore({ setPage }) {
  const menuitems = [
    {
      header: 'West Side',
      items: [
        { id: 'sports_science_lab', text: 'Sports Science Lab', url: '/', icon: <LocalDining /> },
        { id: 'travel_agency', text: 'Travel Agency', url: '/', icon: <FlightTakeoff /> },
        { id: 'item_market', text: 'Item Market', url: '/', icon: <Storefront /> },
      ],
    },
    {
      header: 'North Side',
      items: [
        { id: 'auction_house', text: 'Auction House', url: '/', icon: <ShoppingCart /> },
        { id: 'item_market', text: 'Item Market', url: '/', icon: <Storefront /> },
        { id: 'item_market', text: 'Item Market', url: '/', icon: <Storefront /> },
      ],
    },
    {
      header: 'City Center',
      items: [

        { id: 'community_center', text: 'Community Center', url: '/', icon: <People /> },
        { id: 'hospital', text: 'Hospital', url: '/', icon: <MedicalServices /> },
        { id: 'item_market', text: 'Item Market', url: '/', icon: <Storefront /> },
      ],
    },
    {
      header: 'Financial',
      items: [
        { id: 'bank', text: 'Bank', url: '/', icon: <AccountBalance /> },
        { id: 'donator_house', text: 'Donator House', url: '/', icon: <Home /> },
        { id: 'item_market', text: 'Item Market', url: '/', icon: <Storefront /> },
      ],
    },
    {
      header: 'East Side',
      items: [
        { id: 'big_als_gun_shop', text: "Big Al's Gun Shop", url: '/', icon: <ShoppingCart /> },
        { id: 'bits_n_bobs', text: 'Bits \'n\' Bobs', url: '/', icon: <Storefront /> },
        { id: 'item_market', text: 'Item Market', url: '/', icon: <Storefront /> },
      ],
    },
    {
      header: 'South Side',
      items: [
        { id: 'big_als_gun_shop', text: "Big Al's Gun Shop", url: '/', icon: <ShoppingCart /> },
        { id: 'bits_n_bobs', text: 'Bits \'n\' Bobs', url: '/', icon: <Storefront /> },
        { id: 'item_market', text: 'Item Market', url: '/', icon: <Storefront /> },
      ],
    },
  ];

  return (
    <React.Fragment>
      <Box
        className="wrapper"
        p={1}
        borderRadius="12px"
        bgcolor="#ffffff"
        boxShadow={2}
        border="0px solid #e0e0e0"
        sx={{
          // maxHeight: '80vh',
        }}
      >
        <Grid container spacing={2}>
          {menuitems.map((section, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box mb={0}>
                <Typography
                  component="h6"
                  variant="h6"
                  color="primary"
                  gutterBottom
                  sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' } }} // Responsive font size for header
                >
                  {section.header}
                </Typography>
                <List>
                  {section.items.map((item, j) => (
                    <ListItem
                      key={j}
                      button
                      onClick={() => setPage(item.url)}
                      sx={{
                        '&:hover': {
                          bgcolor: '#e0f7fa',
                          transform: 'scale(1.02)',
                          transition: 'transform 0.2s ease-in-out',
                        },
                        borderRadius: '8px',
                        backgroundColor: '#f5f5f5',
                        width: '100%',
                      }}
                    >
                      <ListItemIcon sx={{ color: '#3f51b5' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{ fontWeight: 'medium', fontSize: { xs: '0.9rem', sm: '1rem' } }} // Responsive font size for list items
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}
