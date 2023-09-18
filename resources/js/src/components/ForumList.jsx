import React from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Typography } from "@mui/material";
import ForumCard from "./ForumCard";
import gameServerApi from "../libraries/gameServerApi";

const data = [
    {
        id: 1,
        categoryName: 'Official forums',
        forumList: [
            {
                id: 1,
                title: 'Announcements',
                url: '/forums/forum/1',
                description: 'Hello World!',
                stats: {
                    threads: 100,
                    posts: 1000,
                },
                lastUpdate: new Date("2023-08-30"),
                recentPost: {
                    thread: {
                        title: 'Hello World',
                        url: '/',
                    },
                    poster: {
                        name: 'Tom',
                        avatar: '',
                        url: '/user/@tom',
                    },
                    publishAt: new Date("2023-08-30"),
                }
            },
            {
                id: 1,
                title: 'Announcements',
                description: 'Hello World!',
                stats: {
                    threads: 100,
                    posts: 1000,
                },
                lastUpdate: new Date("2023-08-30"),
                recentPost: {
                    thread: {
                        title: 'Hello World',
                        url: '/',
                    },
                    poster: {
                        name: 'Tom',
                        avatar: '',
                        url: '/user/@tom',
                    },
                    publishAt: new Date("2023-08-30"),
                }
            },
            {
                id: 1,
                title: 'Announcements',
                description: 'Hello World!',
                stats: {
                    threads: 100,
                    posts: 1000,
                },
                lastUpdate: new Date("2023-08-30"),
                recentPost: {
                    thread: {
                        title: 'Hello World',
                        url: '/',
                    },
                    poster: {
                        name: 'Tom',
                        avatar: '',
                        url: '/user/@tom',
                    },
                    publishAt: new Date("2023-08-30"),
                }
            },
            {
                id: 1,
                title: 'Announcements',
                description: 'Hello World!',
                stats: {
                    threads: 100,
                    posts: 1000,
                },
                lastUpdate: new Date("2023-08-30"),
                recentPost: {
                    thread: {
                        title: 'Hello World',
                        url: '/',
                    },
                    poster: {
                        name: 'Tom',
                        avatar: '',
                        url: '/user/@tom',
                    },
                    publishAt: new Date("2023-08-30"),
                }
            },
        ]
    },
    {
        id: 2,
        categoryName: 'Discussion',
        forumList: [
            {
                id: 1,
                title: 'Announcements',
                url: '/forums/forum/1',
                description: 'Hello World!',
                stats: {
                    threads: 100,
                    posts: 1000,
                },
                lastUpdate: new Date("2023-08-30"),
                recentPost: {
                    thread: {
                        title: 'Hello World',
                        url: '/',
                    },
                    poster: {
                        name: 'Tom',
                        avatar: '',
                        url: '/user/@tom',
                    },
                    publishAt: new Date("2023-08-30"),
                }
            },
            {
                id: 1,
                title: 'Announcements',
                description: 'Hello World!',
                stats: {
                    threads: 100,
                    posts: 1000,
                },
                lastUpdate: new Date("2023-08-30"),
                recentPost: {
                    thread: {
                        title: 'Hello World',
                        url: '/',
                    },
                    poster: {
                        name: 'Tom',
                        avatar: '',
                        url: '/user/@tom',
                    },
                    publishAt: new Date("2023-08-30"),
                }
            },
            {
                id: 1,
                title: 'Announcements',
                description: 'Hello World!',
                stats: {
                    threads: 100,
                    posts: 1000,
                },
                lastUpdate: new Date("2023-08-30"),
                recentPost: {
                    thread: {
                        title: 'Hello World',
                        url: '/',
                    },
                    poster: {
                        name: 'Tom',
                        avatar: '',
                        url: '/user/@tom',
                    },
                    publishAt: new Date("2023-08-30"),
                }
            },
            {
                id: 1,
                title: 'Announcements',
                description: 'Hello World!',
                stats: {
                    threads: 100,
                    posts: 1000,
                },
                lastUpdate: new Date("2023-08-30"),
                recentPost: {
                    thread: {
                        title: 'Hello World',
                        url: '/',
                    },
                    poster: {
                        name: 'Tom',
                        avatar: '',
                        url: '/user/@tom',
                    },
                    publishAt: new Date("2023-08-30"),
                }
            },
        ]

    }
]


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "transparent",
    ...theme.typography.body1,
    padding: theme.spacing(0),
    textAlign: "left",
    color: theme.palette.text.primary
}));


export default function ForumList({ forumId, handleClick }) {
    const [forumList, setForumList] = React.useState();

    React.useEffect(() => {
        const fetchForums = async () => {
            const response = await gameServerApi("forums");
            setForumList(response);
        };
        fetchForums();
    }, []);

    console.log("forumsList", forumList)

    return (
        <React.Fragment>
            <Box>
                <h5>Forums</h5>
                {
                    data.map((forum, i) =>

                        <Grid key={i} container spacing={1}>
                            <Grid item xs={12}>
                                <Item>
                                    <Typography variant="h5" component="h2">
                                        {forum.categoryName}
                                    </Typography>
                                </Item>
                            </Grid>
                            <ForumCard handleClick={handleClick} item={forum.forumList} />
                        </Grid>
                    )
                }
            </Box>
        </React.Fragment>

    )
}
// https://codesandbox.io/s/forumslayout-pks94c