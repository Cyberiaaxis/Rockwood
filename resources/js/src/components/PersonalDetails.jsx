import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "../styles/PersonalDetails.css";
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";
import { useProfile } from "../libraries/ProfileContext";

/**
 * PersonalDetails Component
 * This component displays a player's personal details such as Name, Level, Rank, Age, Gang, Partner, and Award.
 * It also includes an editable text area for the player's signature using the `draft-js` library.
 *
 * @param {function} setPage - A function to set the current page when a player detail is clicked.
 */
export default function PersonalDetails({ setPage }) {
  // Accessing the playerId from ProfileContext
  const { playerId } = useProfile();
  // State to manage the editor content for the signature
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [playerDetail, setPlayerDetail] = React.useState("");

  /**
   * selectPage
   * Handles the click event on player details and updates the page using the setPage function.
   * @param {object} event - The event object triggered by clicking a player detail.
   */
  function selectPage(event) {
    setPage(event.target.innerText);
  }
  /**
* Fetch the list of online players based on the selected time range.
*
* @param {number} timeData - The time range in minutes to filter online players.
*/
  const handleProfile = async (playerId) => {
    try {
      const response = await toast.promise(
        gameServerApi('/playerDetails', 'POST', { playerId }),
        {
          pending: 'Fetching online players...',
          success: {
            render({ data }) {
              setPlayerDetail(data);
              return 'player fetched successfully!';
            },
          },
          error: {
            theme: 'colored',
            render({ data }) {
              return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message || 'An error occurred while fetching online players';
            },
          },
        }
      );
    } catch (error) {
      toast.error('Failed to fetch online players');
    }
  };

  // Fetch initial data for players online within the last 15 minutes.
  React.useEffect(() => {
    handleProfile(playerId);
  }, []);

  console.log("playerDetail", playerDetail.userName);
  return (
    <React.Fragment>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }} // Stack vertically on small screens and horizontally on larger screens
        justifyContent="space-between"
        padding={0}
        bgcolor="background.paper"
        boxShadow={3}
        borderRadius={2}
        gap={1} // Adds space between the two columns
        margin={0}
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
              {playerDetail.userName}
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              {playerDetail.level}
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              {playerDetail.rank}
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              {playerDetail.age}
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              {playerDetail.gang_name}
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              this still pending to fetch
            </ListItem>
            <ListItem sx={{ bgcolor: "grey.100", marginBottom: "4px", borderRadius: "4px" }}>
              still this is pending to fetch
            </ListItem>
          </List>
        </Box>
      </Box>
    </React.Fragment>
  );
}
