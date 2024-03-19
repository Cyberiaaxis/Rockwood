import React from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import ForumCard from "./ForumCard";
import gameServerApi from "../libraries/gameServerApi";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#303030" : "#f5f5f5", // Dark or light background based on theme mode
    ...theme.typography.body1,
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.primary,
}));

export default function ForumList({ forumId, handleClick }) {
    const [forumsList, setForumsList] = React.useState([]);

    React.useEffect(() => {
        const fetchForums = async () => {
            const response = await gameServerApi("forums");
            setForumsList(response);
        };
        fetchForums();
    }, []);

    return (
        <React.Fragment>
            <Box>
                <Typography variant="h4" style={{ marginBottom: '1rem', backgroundColor: "black", color: '#FFD700' }}>Forums</Typography>
                {forumsList.map((forum, index) => (
                    <Grid key={index} container spacing={2}>
                        <Grid item xs={12}>
                            <Item>
                                <Typography variant="h5" component="h2" style={{ color: '#FFD700' }}>
                                    {forum.title}
                                </Typography>
                            </Item>
                        </Grid>
                        {forum.forumList && forum.forumList.map((forumItem, idx) => (
                            <Grid key={idx} item xs={12}>
                                <ForumCard item={forumItem} handleClick={handleClick} />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Box>
        </React.Fragment>
    );
}
