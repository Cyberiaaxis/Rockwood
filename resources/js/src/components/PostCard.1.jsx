import * as React from 'react';
import { Avatar, Button, Typography, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import NewPostForm from "./NewPostForm";
import { AuthContext } from "../libraries/AuthContext";
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";
import { QuotePostCard } from './PostCard';


export default function PostCard({ item, handleQuoteClick }) {
    const { user, setUser } = React.useContext(AuthContext);
    const [editor, setEditor] = React.useState(false);
    const [like, setLike] = React.useState(false);
    const [dislike, setDislike] = React.useState(false);
    const [quote, setQuote] = React.useState(false);

    React.useEffect(() => {

        console.log('content updated');

    }, [item.content]);

    React.useEffect(() => {

        console.log('like updated');

    }, [item.like]);

    React.useEffect(() => {

        console.log('dislike updated');

    }, [item.dislike]);

    // console.log("handleQuoteClick", handleQuoteClick);
    const handlePostReply = async (inputText) => {

        const data = { id: item.id, content: inputText };
        // console.log("data", data);
        const response = await toast.promise(
            gameServerApi('/modifyPost', 'post', data),
            {
                pending: 'Please wait',
                success: {
                    render({ data }) {
                        // console.log(item);

                        item.content = data;

                        return 'Post posted';
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

            setEditor(false);

            item.content = response;
        }
    };
    const handleAddLike = async (postId) => {
        const response = await toast.promise(
            gameServerApi('/addLike', 'post', { post_id: postId }),
            {
                pending: 'Please wait',
                success: {
                    render({ data }) {
                        setLike(data);
                        return 'Liked';
                    },
                },
                error: {
                    theme: 'colored',
                    render({ data }) {
                        return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message;
                    },
                },
            }
        );

        if (response) {
            item.like = response;
        }

    };

    const handleAddDislike = async (postId) => {
        const response = await toast.promise(
            gameServerApi('/addDislike', 'post', { post_id: postId }),
            {
                pending: 'Please wait',
                success: {
                    render({ data }) {
                        setDislike(data);

                        return 'Disliked';
                    },
                },
                error: {
                    theme: 'colored',
                    render({ data }) {
                        return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message;
                    },
                },
            }
        );
        if (response) {
            item.dislike = response;
        }
    };

    const EditButtons = () => {
        return (
            <React.Fragment>
                <Button
                    onClick={() => setEditor(true)}
                    startIcon={(
                        <Tooltip title="Edit">
                            <EditIcon sx={{ color: 'blue' }} />
                        </Tooltip>
                    )}
                    color="inherit" />
                {editor ? (
                    <Button
                        onClick={() => setEditor(false)}
                        endIcon={(
                            <Tooltip title="Close">
                                <HighlightOffIcon sx={{ color: 'red' }} />
                            </Tooltip>
                        )}
                        color="inherit" />
                ) : ''}
            </React.Fragment>
        );
    };
    // console.log("likeeeee", like);
    return (
        <div className='flex gap-2 bg-gray-100'>
            <div className="poster w-60 flex flex-col items-center justify-center gap-1">
                <Tooltip title={item.poster.title + " as " + item.poster.role}>
                    <Typography variant="h6">
                        {item.poster.title}
                    </Typography>
                </Tooltip>
                <Avatar
                    src={item.poster.avatar}
                    sx={{ width: 100, height: 100 }} />
                <div className="w-full flex flex-col items-center gap-1">
                    <div className="bg-purple-700 text-center text-white rounded-md px-4 py-1 shadow">
                        {item.poster.forumRank}
                    </div>
                    <div className="bg-purple-700 text-center text-white rounded-md px-4 py-1 shadow">
                        {item.poster.posts}
                    </div>
                </div>
            </div>
            <div className="flex-auto flex flex-col gap-2 py-2">
                <Typography variant="subtitle2" className="post-header block"> Posted {item.createdAt}
                    {user && user.userId === item.poster.id ? <EditButtons /> : ""}
                </Typography>

                <Typography variant="body2" className="post-body flex flex-col gap-1">
                    {editor ?
                        <NewPostForm handlePostReply={handlePostReply} oldContent={item.content} buttonText='Update Post' />
                        :
                        <React.Fragment>

                            {item?.quotes?.length ? item?.quotes?.map((quote, i) => <QuotePostCard item={quote} key={i} />) : ''}

                            {item.content}
                        </React.Fragment>}
                </Typography>

                <div className="post-footer flex items-center justify-between">
                    <Button startIcon={<Tooltip title="Quote"><QuickreplyIcon sx={{ color: 'yellowgreen' }} /></Tooltip>} onClick={() => handleQuoteClick(item.id)}>
                        Quote
                    </Button>
                    <div className="right">
                        <Button startIcon={<Tooltip title="Like"><FavoriteIcon sx={{ color: 'green' }} onClick={() => handleAddLike(item.id)} /></Tooltip>}>
                            {like ? like : item.like}
                        </Button>
                        <Button endIcon={<Tooltip title="Dislike"><HeartBrokenIcon sx={{ color: 'red' }} onClick={() => handleAddDislike(item.id)} /></Tooltip>}>
                            {dislike ? dislike : item.dislike}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
