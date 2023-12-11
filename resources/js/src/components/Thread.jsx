import * as React from "react";
import PostCard from "./PostCard";
import { Button, Pagination, Typography } from "@mui/material";

import NewPostForm from "./NewPostForm";
import { useForm } from "react-hook-form";
import gameServerApi from "../libraries/gameServerApi";
import { toast } from "react-toastify";

export default function Thread({ threadId }) {
    const [page, setPage] = React.useState(1);
    const [thread, setThread] = React.useState(null);
    const [postList, setPostList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const textAreaRef = React.useRef({});

    const handlePageChange = (event, value) => {
        setPage(value);
        fetchData();
    };

    const fetchData = async (page = 1) => {
        setLoading(true);

        try {
            const response = await gameServerApi(`thread/${threadId}?page=${page}`);
            setThread(response)
            setPostList(response.posts.data ?? []);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
            toast.error(error.message);
        }

    };

    React.useEffect(() => {
        fetchData();
    }, []);


    React.useEffect(() => {
        fetchData();
    }, [threadId]);

    // console.log("thread", thread, "postList", postList);

    const handlePostReply = async (inputText) => {
        const data = { forum_id: thread.forum_id, thread_id: threadId, content: inputText }
        const response = await toast.promise(
            gameServerApi('/savePost', 'post', data),
            {
                pending: 'Please wait',
                success: {
                    render({ data }) {

                        fetchData();
                        console.log('handlePostReply-data', data);
                        return 'Post posted'
                    },
                },
                error: {
                    theme: 'colored',
                    render({ data }) {
                        return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message;
                    },
                },
                // error: 'An error occurred while creating your account',
            }
        );
        if (response) {
            console.log('handlePostReply-response', response);
        }

    };

    const handleQuoteClick = (quote_postId) => {
        textAreaRef.current.value = `>>${quote_postId}\n${textAreaRef.current.value}`;
        textAreaRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <React.Fragment>
            <div className="flex flex-col gap-1 divide-y">
                <PostHeader page={page} total={thread?.posts?.total} handlePageChange={handlePageChange} />
                <div className="post-list divide-y flex flex-col gap-2">
                    {loading ? <h1>Loading...</h1> : postList.length ? postList.map((x, i) => <PostCard key={i} item={x} handleQuoteClick={handleQuoteClick} />) : ''}
                </div>
                <PostHeader page={page} total={thread?.posts?.total} handlePageChange={handlePageChange} />
                <div className="block rounded shadow divide-y">
                    <Typography variant="subtitle1" className="px-4 py-2">
                        Post a new Reply
                    </Typography>
                    <NewPostForm quotedRef={textAreaRef} handlePostReply={handlePostReply} />
                </div>
            </div>
        </React.Fragment>


    );
}

function PostHeader({ page, total = 1, handlePageChange }) {
    return (
        <div className="navigation border-b p-2 flex items-center gap-2">
            <Pagination
                page={page}
                onChange={handlePageChange}
                count={total ?? 1}
                shape="rounded"
                color="primary"
                showFirstButton
                showLastButton
            />
            <Button color="inherit" className="">
                Page {page} of {total}
            </Button>
        </div>
    );
}