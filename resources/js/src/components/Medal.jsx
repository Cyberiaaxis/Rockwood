import * as React from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

const items = [
  {
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
    title: "Home",
    body:
      "HomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHome"
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
    title: "Inventory",
    body:
      "InventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventory"
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
    title: "Explore",
    body:
      "ExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExplore"
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
    title: "Forums",
    body:
      "ForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForums"
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
    title: "Home",
    body:
      "HomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHome"
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
    title: "Inventory",
    body:
      "InventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventoryInventory"
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
    title: "Explore",
    body:
      "ExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExploreExplore"
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
    title: "Forums",
    body:
      "ForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForumsForums"
  }
];

function DetailsOfImage(props) {

  return (
    <div>
      <p>{props.title}</p>
      <div>{props.body}</div>
    </div>
  );
}

function Medal() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: { xs: 600 },
        bgcolor: "transparent"
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 }
          }
        }}
      >
        {items.map((item, key) => (
          <Tab
            sx={{ paddingTop: 0.5 }}
            icon={
              <Tooltip
                title={<DetailsOfImage {...item} />}
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "#B5651D",
                      "& .MuiTooltip-arrow": {
                        color: "#B5651D"
                      }
                    }
                  }
                }}
              >
                <Avatar alt={item.title} src={item.imgPath} />
              </Tooltip>
            }
            key={key}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default Medal;
