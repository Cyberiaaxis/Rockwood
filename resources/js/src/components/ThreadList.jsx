import * as React from 'react'
import { Button, Pagination, PaginationItem } from '@mui/material'
import ThreadCard from './ThreadCard';
import gameServerApi from '../libraries/gameServerApi';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

export default function ThreadList({ forumId, handleClick }) {

    const [page, setPage] = React.useState(1);
    const [forum, setForum] = React.useState(null)
    const [threadList, setThreadList] = React.useState([]);
    const [addNewTopic, setAddNewTopic] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const kek = {
        "id": 2,
        "title": "General Discussions",
        "description": null,
        "is_cat": 0,
        "parent_id": 1,
        "created_at": null,
        "updated_at": null,
        "threads_count": 1,
        "posts_count": 0,
        "threads": {
            "currentPage": 1,
            "total": 1,
            "data": [
                {
                    "id": 1,
                    "title": "Introductions",
                    "description": null,
                    "forum_id": 2,
                    "user_id": 1,
                    "sticky": 0,
                    "locked": 0,
                    "created_at": "2023-09-28T19:37:39.000000Z",
                    "updated_at": "2023-09-28T19:37:39.000000Z",
                    "latest_post": null
                }
            ]
        }
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        fetchThreads(value);
    };

    const handleAddNewTopic = () => {
        setAddNewTopic(true);
    }

    const handleAddNewTopicClose = () => {
        setAddNewTopic(false);
    }

    React.useEffect(() => {
        fetchThreads();
    }, []);

    const fetchThreads = async (page = 1) => {
        try {
            const response = await gameServerApi(`forum/${forumId}?page=${page}`);
            setForum(kek)
            setThreadList(kek.threads.data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            <h5 className='flex items-center justify-between'>
                {forum?.title}

                <Button variant="contained" size="large" color="primary" onClick={handleAddNewTopic}>
                    Start a new Topic
                </Button>
            </h5>
            {addNewTopic ? <Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-end'
                }}>
                    <CloseIcon onClick={handleAddNewTopicClose} />
                </Box>
                <Box>
                    <TextField fullWidth label="fullWidth" id="fullWidth" />
                </Box>
                <Button variant="contained">Contained</Button>
            </Box> :
                <div className="block bg-white border shadow rounded">
                    <ThreadListHeader page={page} forum={forum} handlePageChange={handlePageChange} />
                    <div className="thread-list">
                        {
                            loading ? <div className="flex flex-col items-center justify-center">
                                <h1>Loading...</h1>
                            </div> : threadList.map((thread, i) => <ThreadCard key={i} item={thread} handleClick={handleClick} />)
                        }
                    </div>
                    <ThreadListHeader page={page} forum={forum} handlePageChange={handlePageChange} />
                </div>
            }
        </div >
    )
}

function ThreadListHeader({ page, forum, handlePageChange }) {
    return (
        <div className="navigation border-b p-2 flex items-center gap-2">
            <Pagination page={page} onChange={handlePageChange} count={forum?.threads?.total ?? 1} shape="rounded" color="primary" showFirstButton showLastButton />

            <Button color="inherit" className="">
                Page {page} of {forum?.threads?.total}
            </Button>
        </div>
    )
}