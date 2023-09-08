import * as React from 'react'
import { Button, Pagination, PaginationItem } from '@mui/material'
import ThreadCard from './ThreadCard';

const data = {
    title: 'Announcements',
    url: '/forums/forum/1',
    threadList: [
        {
            id: 1,
            title: 'Announcements',
            description: 'Hello World!',
            stats: {
                posts: 100,
                views: 1000,
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
            id: 2,
            title: 'Announcements',
            description: 'Hello World!',
            stats: {
                posts: 100,
                views: 1000,
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
            id: 3,
            title: 'Announcements',
            description: 'Hello World!',
            stats: {
                posts: 100,
                views: 1000,
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
            id: 4,
            title: 'Announcements',
            description: 'Hello World!',
            stats: {
                posts: 100,
                views: 1000,
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
            id: 5,
            title: 'Announcements',
            description: 'Hello World!',
            stats: {
                posts: 100,
                views: 1000,
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
            },
        },
        {
            id: 6,
            title: 'Announcements',
            description: 'Hello World!',
            stats: {
                posts: 100,
                views: 1000,
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
            },
        },
        {
            id: 7,
            title: 'Announcements',
            description: 'Hello World!',
            stats: {
                posts: 100,
                views: 1000,
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
            },
        },
        {
            id: 8,
            title: 'Announcements',
            description: 'Hello World!',
            stats: {
                posts: 100,
                views: 1000,
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
            },
        },
        {
            id: 9,
            title: 'Announcements',
            description: 'Hello World!',
            stats: {
                posts: 100,
                views: 1000,
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
            },
        },
        {
            id: 10,
            title: 'Announcements',
            description: 'Hello World!',
            stats: {
                posts: 100,
                views: 1000,
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
            },
        },
    ]
}

export default function ThreadList({ forumId, handleClick }) {

    const [page, setPage] = React.useState(1);
    const [threadList, setThreadList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const handlePageChange = (event, value) => {
        setPage(value);

        fetchData()
    };

    const fetchData = async () => {

        setLoading(true);

        setTimeout(() => {
            setThreadList(data.threadList);

            console.log('hue');

            setLoading(false);
        }, 1000);

    }

    return (
        <div className='flex flex-col gap-2'>
            <h5 className='flex items-center justify-between'>
                {data.title}

                <Button variant="contained" size="large" color="primary">
                    Start a new Topic
                </Button>
            </h5>
            <div className="block bg-white border shadow rounded">
                <ThreadListHeader page={page} handlePageChange={handlePageChange} />
                <div className="thread-list">
                    {
                        loading ? <div className="flex flex-col items-center justify-center">
                            <h1>Loading...</h1>
                        </div> : threadList.map((thread, i) => <ThreadCard key={i} item={thread} handleClick={handleClick} />)
                    }
                </div>
                <ThreadListHeader page={page} handlePageChange={handlePageChange} />
            </div>
        </div>
    )
}

function ThreadListHeader({ page, handlePageChange }) {
    return (
        <div className="navigation border-b p-2 flex items-center gap-2">
            <Pagination page={page} onChange={handlePageChange} count={10} shape="rounded" color="primary" showFirstButton showLastButton />

            <Button color="inherit" className="">
                Page {page} of 10
            </Button>
        </div>
    )
}