import * as React from 'react'
import PostCard from './PostCard'
import { Button, Pagination, Typography } from '@mui/material'
import NewPostForm from './NewPostForm';

const data = [
    {
        id: 1,
        poster: {
            title: 'Tom',
            url: '/user/@tom',
            avatar: 'https://makewebgames.io/uploads/monthly_2019_02/6330913.thumb.jpeg.68aa3405e4715f7889d404c860563947.jpeg',
            posts: 2000,
            likes: '1k',
            badges: ['Admin']
        }
    },
    {
        id: 2,
        poster: {
            title: 'Tom',
            url: '/user/@tom',
            avatar: 'https://makewebgames.io/uploads/monthly_2019_02/6330913.thumb.jpeg.68aa3405e4715f7889d404c860563947.jpeg',
            posts: 2000,
            likes: '1k',
            badges: ['Admin']
        }
    },
    {
        id: 3,
        poster: {
            title: 'Tom',
            url: '/user/@tom',
            avatar: 'https://makewebgames.io/uploads/monthly_2019_02/6330913.thumb.jpeg.68aa3405e4715f7889d404c860563947.jpeg',
            posts: 2000,
            likes: '1k',
            badges: ['Admin']
        }
    },
    {
        id: 4,
        poster: {
            title: 'Tom',
            url: '/user/@tom',
            avatar: 'https://makewebgames.io/uploads/monthly_2019_02/6330913.thumb.jpeg.68aa3405e4715f7889d404c860563947.jpeg',
            posts: 2000,
            likes: '1k',
            badges: ['Admin']
        }
    },
    {
        id: 5,
        poster: {
            title: 'Tom',
            url: '/user/@tom',
            avatar: 'https://makewebgames.io/uploads/monthly_2019_02/6330913.thumb.jpeg.68aa3405e4715f7889d404c860563947.jpeg',
            posts: 2000,
            likes: '1k',
            badges: ['Admin']
        }
    },
    {
        id: 6,
        poster: {
            title: 'Tom',
            url: '/user/@tom',
            avatar: 'https://makewebgames.io/uploads/monthly_2019_02/6330913.thumb.jpeg.68aa3405e4715f7889d404c860563947.jpeg',
            posts: 2000,
            likes: '1k',
            badges: ['Admin']
        }
    }
]

export default function Thread({ threadId }) {

    const [page, setPage] = React.useState(1);
    const [postList, setPostList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const handlePageChange = (event, value) => {
        setPage(value);
        fetchData()
    };

    const fetchData = async () => {

        setLoading(true);

        setTimeout(() => {
            setPostList(data);

            setLoading(false);
        }, 1000);

    }

    return (
        <div className="flex flex-col gap-1 divide-y">

            <PostHeader page={page} handlePageChange={handlePageChange} />

            <div className="post-list">
                {data.map((x, i) => <PostCard key={i} item={x} />)}
            </div>

            <PostHeader page={page} handlePageChange={handlePageChange} />

            <div className="block rounded shadow divide-y">
                <Typography variant="subtitle1" className="px-4 py-2" >
                    Post a new Reply
                </Typography>
                <NewPostForm />
            </div>
        </div>
    )
}

function PostHeader({ page, handlePageChange }) {
    return (
        <div className="navigation border-b p-2 flex items-center gap-2">
            <Pagination page={page} onChange={handlePageChange} count={10} shape="rounded" color="primary" showFirstButton showLastButton />

            <Button color="inherit" className="">
                Page {page} of 10
            </Button>
        </div>
    )
}