import * as React from 'react'
import { Avatar, Button, IconButton, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import NewPostForm from "./NewPostForm";
import { AuthContext } from "../libraries/AuthContext";
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";

export default function PostCard({ item }) {
    const { user, setUser } = React.useContext(AuthContext);
    const [editor, setEditor] = React.useState(false);
    const [quote, setQuote] = React.useState(false);

    React.useEffect(() => {

        // console.log('content updated');

    }, [item.content]);

    console.log("PostCard", item);
    console.log("userconsolelogoutput", user);
    const handleQuoteReply = (e) => {

        // console.log("condition", user.userId === item.poster.id, "user", user, "item", item);
    }
    // console.log("condition", user.userId === item.poster.id, "user", user, "item", item);
    console.log("quote", quote);
    const handlePostReply = async (inputText) => {

        const data = { id: item.id, content: inputText }
        // console.log("quote", quote);
        const pathName = quote ? '/quotePost' : '/modifyPost';
        const response = await toast.promise(
            gameServerApi(pathName, 'post', data),
            {
                pending: 'Please wait',
                success: {


                    render({ data }) {

                        console.log(item);

                        item.content = data;

                        return quote ? 'Quoted Successfully' : 'Post posted';
                    },
                },
                error: {
                    theme: 'colored',
                    render({ data }) {
                        return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message;
                    },
                },
                // error: 'An error occurred while creating your account',
            },
        );

        if (response) {

            setEditor(false);

            item.content = response;
        }
    };
    const handleReply = () => { }
    const EditButtons = () => {
        return (
            <React.Fragment>
                <Button onClick={() => setEditor(true)} startIcon={<EditIcon />} color="inherit"></Button>
                <Button onClick={() => setEditor(false)} startIcon={<HighlightOffIcon />} color="inherit"></Button>
            </React.Fragment>
        )
    }

    return (
        <div className='flex gap-2 bg-gray-100'>
            <div className="poster w-60 flex flex-col items-center justify-center gap-1">
                <Typography variant="h6">
                    {item.poster.title}
                </Typography>

                <Avatar
                    src={item.poster.avatar}
                    sx={{ width: 100, height: 100 }}
                />
                <div className="w-full flex flex-col items-center gap-1">
                    <div className="bg-purple-700 text-center text-white rounded-md px-4 py-1 shadow">
                        Admin
                    </div>
                </div>
            </div>
            <div className="flex-auto flex flex-col gap-2 py-2">
                <Typography variant="subtitle2" className="post-header block">Posted {item.createdAt}
                    {item.editable ? <EditButtons /> : ""}
                </Typography>

                <Typography variant="body2" className="post-body flex flex-col gap-1">
                    {
                        editor ?
                            <NewPostForm handlePostReply={handlePostReply} oldContent={item.content} quote={quote} buttonText='Update Post' />
                            :
                            item.content
                    }
                </Typography>

                <div className="post-footer flex items-center justify-between">
                    <Button startIcon={<QuickreplyIcon />} color="inherit" onClick={() => { setEditor(true), setQuote(true) }}>
                        Quote
                    </Button>
                    <div className="right">
                        <Button startIcon={<FavoriteIcon />} color="inherit">
                            0
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}