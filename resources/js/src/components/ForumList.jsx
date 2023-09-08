import React from 'react'
import ForumCard from "./ForumCard"

const data = [
    {
        category: 'Official forums',
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

export default function ForumList({ forumId, handleClick }) {
    return (
        <div>
            <h5>Forums</h5>
            {
                data.map((forum, i) =>
                    <div key={i} className="flex flex-col">
                        <h2 className="bg-gray-100 px-4 py-2">{forum.category}</h2>

                        <div className="flex flex-col gap-1 divide-y">
                            {forum.forumList.map((x, i) => <ForumCard handleClick={handleClick} key={i} item={x} />)}
                        </div>
                    </div>
                )
            }
        </div>
    )
}