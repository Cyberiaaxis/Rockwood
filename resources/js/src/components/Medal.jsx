import * as React from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import "../styles/scrollStyles.css"; // Import custom CSS for scroll styling

/**
 * Data item structure for tab content
 * @typedef {Object} Item
 * @property {string} imgPath - The URL of the image to display in the Avatar
 * @property {string} title - The title of the tab
 * @property {string} body - The body content to display in the tooltip
 */

/**
 * Sample data items to be used in the tabs
 * @type {Item[]}
 */
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

/**
 * Component to display the details of the image in the tooltip.
 * @param {Object} props - The props for the component
 * @param {string} props.title - The title of the tab
 * @param {string} props.body - The body content of the tab
 * @returns {JSX.Element} The details of the image in a div
 */
function DetailsOfImage({ title, body }) {
  return (
    <div>
      <p>{title}</p>
      <div>{body}</div>
    </div>
  );
}

/**
 * Medal Component displays tabs with images and tooltips.
 * It includes a custom scrolling behavior when tabs are selected.
 * @returns {JSX.Element} The Medal component
 */
function Medal() {
  // State to keep track of the selected tab
  const [value, setValue] = React.useState(0);

  // Ref to access the Tabs DOM element for custom scrolling
  const tabsRef = React.useRef(null);

  /**
   * Handles tab selection and scrolls the selected tab into view with smooth behavior.
   * @param {React.ChangeEvent<{}>} event - The change event object
   * @param {number} newValue - The new value of the selected tab
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Smooth scroll to the selected tab
    if (tabsRef.current) {
      const tabElement = tabsRef.current.querySelector(`button[data-index="${newValue}"]`);
      if (tabElement) {
        tabElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: { xs: 600 },
        bgcolor: "transparent",
      }}
    >
      <Tabs
        ref={tabsRef} // Reference for custom scrolling behavior
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="scrollable tabs"
        className="customScrollTabs" // Custom CSS class for scrolling
      >
        {items.map((item, index) => (
          <Tab
            key={index}
            data-index={index} // Add data-index attribute for scroll targeting
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
                        color: "#B5651D",
                      },
                    },
                  },
                }}
              >
                <Avatar
                  alt={item.title}
                  src={item.imgPath}
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: "50%", // Makes the Avatar circular
                  }}
                />
              </Tooltip>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default Medal;
