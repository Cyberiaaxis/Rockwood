import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Typography } from "@mui/material";

import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "transparent",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: "inherit",
}));

export default function ForumCard({ item, handleClick }) {

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs>
                    <Box sx={{ paddingLeft: 1 }}>
                        <Typography variant="body" component="h2">
                            <Box onClick={() => handleClick('threads', item.id)} className="block text-lg cursor-pointer">
                                {item.title}
                            </Box>
                        </Typography>
                    </Box>
                    <Box sx={{ paddingLeft: 1 }}>
                        <Typography variant="subtitle1" component="h2">
                            {item.description}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Grid container gap={1}>
                        <Item className="flex items-center gap-2">
                            <Box>
                                <Typography variant="subtitle2" component="h2">
                                    Posts
                                </Typography>

                                <Typography sx={{ textAlign: 'center' }} variant="subtitle1" component="h2">
                                    {item.stats.posts}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" component="h2">
                                    Threads
                                </Typography>

                                <Typography sx={{ textAlign: 'center' }} variant="subtitle1" component="h2">
                                    {item.stats.threads}
                                </Typography>
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
                {item.latest_Post &&
                    <Grid item sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                        <Item sx={{ display: "flex" }}>
                            <Box sx={{ flexGrow: 1, margin: 1 }}>
                                <Avatar alt={item.recentPost.poster.name} src={item.recentPost.poster.avatar} />
                            </Box>
                            <Grid item>
                                <Box >
                                    <Typography variant="subtitle2" component="h2">
                                        <Link to={item.latestPost.thread.url}>
                                            {item.recentPost.thread.title}
                                        </Link>
                                    </Typography>
                                </Box>
                                <Box >
                                    <Typography variant="subtitle1" component="h2">
                                        <Link to={item.recentPost.poster.url} className="text-sm">
                                            by {item.recentPost.poster.name}
                                        </Link>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Item>
                    </Grid>
                }
            </Grid>
        </React.Fragment>
    )
}