import React from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Typography } from "@mui/material";
import ForumCard from "./ForumCard";
import gameServerApi from "../libraries/gameServerApi";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "transparent",
    ...theme.typography.body1,
    padding: theme.spacing(0),
    textAlign: "left",
    color: theme.palette.text.primary
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

    // console.log("forumsList", forumsList)

    return (
        <React.Fragment>
            <Box>
                <h5>Forums</h5>
                {
                    forumsList.length && forumsList.map((forum, i) =>

                        <Grid key={i} container spacing={1}>
                            <Grid item xs={12}>
                                <Item sx={{ backgroundColor: "yellowgreen" }}>
                                    <Typography variant="h5" component="h2">
                                        {forum.title}
                                    </Typography>
                                </Item>
                            </Grid>
                            {forum.forumList && forum.forumList.length && forum.forumList.map((x, i) => <ForumCard key={i} item={x} handleClick={handleClick} />)}
                        </Grid>
                    )
                }
            </Box>
        </React.Fragment>

    )
}