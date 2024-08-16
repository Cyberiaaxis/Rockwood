import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "../styles/PersonalDetails.css";

/**
 * PersonalDetails Component
 * This component displays a player's personal details such as Name, Level, Rank, Age, Gang, Partner, and Award.
 * It also includes an editable text area for the player's signature using the `draft-js` library.
 *
 * @param {function} setPage - A function to set the current page when a player detail is clicked.
 */
export default function PersonalDetails({ setPage }) {
  // State to manage the editor content for the signature
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  /**
   * selectPage
   * Handles the click event on player details and updates the page using the setPage function.
   * @param {object} event - The event object triggered by clicking a player detail.
   */
  function selectPage(event) {
    setPage(event.target.innerText);
  }

  return (
    <React.Fragment>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }} // Stack vertically on small screens and horizontally on larger screens
        justifyContent="space-between"
        padding={2}
        bgcolor="background.paper"
        boxShadow={3}
        borderRadius={2}
        gap={1} // Adds space between the two columns
      >
        <Box flex={1} minWidth={{ xs: '100%', sm: '200px' }} marginRight={{ sm: 0 }}>
          <List dense>
            <ListItem sx={{ bgcolor: "grey.200", marginBottom: "4px", borderRadius: "4px" }}>
              Name
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.200", marginBottom: "4px", borderRadius: "4px" }}>
              Level
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.200", marginBottom: "4px", borderRadius: "4px" }}>
              Rank
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.200", marginBottom: "4px", borderRadius: "4px" }}>
              Age
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.200", marginBottom: "4px", borderRadius: "4px" }}>
              Gang
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.200", marginBottom: "4px", borderRadius: "4px" }}>
              Partner
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.200", marginBottom: "4px", borderRadius: "4px" }}>
              Award
            </ListItem>
          </List>
        </Box>
        <Box flex={1} minWidth={{ xs: '100%', sm: '200px' }}>
          <List dense>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              Rockwood
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              100
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              #19 Celebrity Felon
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              1234
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              Gang of Wasypur
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              Want3d
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              200
            </ListItem>
          </List>
        </Box>
      </Box>
    </React.Fragment>
  );
}
