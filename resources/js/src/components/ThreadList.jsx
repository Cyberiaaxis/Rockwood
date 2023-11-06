import * as React from 'react'
import { Button, Pagination, PaginationItem } from '@mui/material'
import ThreadCard from './ThreadCard';
import gameServerApi from '../libraries/gameServerApi';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import ValidationErrors from "../libraries/ValidationErrors";
import { useForm } from "react-hook-form";

import { Editor } from "@tinymce/tinymce-react";

export default function ThreadList({ forumId, handleClick }) {

    const editorRef = React.useRef(null);

    const {
        register,
        setError,
        formState: { errors },
        handleSubmit,
        clearErrors,
    } = useForm();

    const [page, setPage] = React.useState(1);
    const [forum, setForum] = React.useState(null)
    const [threadList, setThreadList] = React.useState([]);
    const [addNewTopic, setAddNewTopic] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [editorState, setEditorState] = React.useState(null);
    const [editorContent, setEditorContent] = React.useState(null);

    const onSubmit = async (data) => {

        const formData = {
            forum_id: forum.id,
            title: data.topic,
            content: editorRef.current.getContent(),
        }

        const response = await toast.promise(
            gameServerApi('/thread/create', 'post', formData),
            {
                pending: 'Please wait, We are creating a new Thread',
                success: {
                    theme: 'colored',
                    render({ data }) {

                        setAddNewTopic(false);

                        fetchThreads();

                        return 'Thread has been created successfully';
                    }
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

    };

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

    const handleTopicCreate = (data, event) => {
        event.preventDefault();
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    React.useEffect(() => {
        fetchThreads();
    }, []);

    const fetchThreads = async (page = 1) => {
        try {
            const response = await gameServerApi(`forum/${forumId}?page=${page}`);
            setForum(response)
            setThreadList(response.threads.data);
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
            {addNewTopic ?
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box textAlign="right">
                        <CloseIcon onClick={handleAddNewTopicClose} />
                    </Box>
                    <Box sx={{ padding: 1 }}>
                        <TextField fullWidth label="Topic" id="topic" name="topic" {...register("topic", { required: true })} />
                    </Box>
                    <Box sx={{ padding: 1 }}>
                        <Editor
                            apiKey="z0ofs10cgemuk3np8d585ugfc6gk6u6k6v32x2htj53u6pe4"
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            initialValue="<p>This is the initial content of the editor.</p>"
                            init={{
                                height: 200,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount"
                                ],
                                toolbar:
                                    "undo redo | formatselect | " +
                                    "bold italic backcolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                            }}
                        />
                    </Box>
                    <Box sx={{ textAlign: "center", paddingTop: 5 }}>
                        <Button type="submit" fullWidth variant="contained">Post Topic</Button>
                    </Box>

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