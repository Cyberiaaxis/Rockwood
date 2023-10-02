import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import "../styles/Forums.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "transparent",
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.primary
}));

export default function ForumCard({ item }) {
    // item.map((x, y) => {
    //     console.log("x", x);
    // })
    console.log("item", item);
    return (
        <React.Fragment>
            {
                item.map((x, y) =>
                    <React.Fragment>
                        <Grid container>
                            <Grid item xs>
                                <Item>
                                    <Box sx={{ paddingLeft: 1, backgroundColor: "red" }}>
                                        <Typography variant="body" component="h2">
                                            <Link to={`/forums/forum/${x.id}`} className="block text-lg">
                                                {x.title}
                                            </Link>
                                        </Typography>
                                    </Box>
                                    <Box sx={{ paddingLeft: 1, backgroundColor: "blue" }}>
                                        <Typography variant="subtitle1" component="h2">
                                            {x.description}
                                            {x?.subForums && x.subForums?.length ? x.subForums.map((h, k) =>
                                                <Link key={k} to={h.url}>
                                                    {h.name}
                                                </Link>
                                            ) : ''}
                                        </Typography>
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item>
                                <Item>
                                    <Grid flexWrap="nowrap" container gap={1}>
                                        <Grid item>
                                            <Box>
                                                <Typography variant="subtitle2" component="h2">
                                                    Posts
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1" component="h2">
                                                    {x.stats.posts}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box>
                                                <Typography variant="subtitle2" component="h2">
                                                    Threads
                                                </Typography>
                                            </Box>
                                            <Box >
                                                <Typography variant="subtitle1" component="h2">
                                                    {x.stats.threads}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Item>
                            </Grid>
                            <Grid item sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                                <Item sx={{ display: "flex" }}>
                                    <Box sx={{ flexGrow: 1, margin: 1 }}>
                                        <Avatar alt={x.recentPost.poster.name} src={x.recentPost.poster.avatar} />
                                    </Box>
                                    <Grid item>
                                        <Box >
                                            <Typography variant="subtitle2" component="h2">
                                                <Link to={x.recentPost.thread.url}>
                                                    {x.recentPost.thread.title}
                                                </Link>
                                            </Typography>
                                        </Box>
                                        <Box >
                                            <Typography variant="subtitle1" component="h2">
                                                <Link to={x.recentPost.poster.url} className="text-sm">
                                                    by {x.recentPost.poster.name}
                                                </Link>
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Item>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
}