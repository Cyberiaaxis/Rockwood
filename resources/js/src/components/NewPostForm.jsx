import * as React from 'react'
import CircularProgressBar from './CircularProgressBar'
import { Avatar, Button } from '@mui/material';

export default function NewPostForm({ open, ...props }) {
    const maxChars = 500;

    const [charsLeft, setCharsLeft] = React.useState(maxChars);
    const [percent, setPercent] = React.useState(0);
    const [inputText, setInputText] = React.useState('');

    const handleChange = (event) => {
        const input = event.target.value;
        setCharsLeft(maxChars - input.length);
        setPercent(input.length);

        setInputText(input);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handlePostReply(inputText);
    }


    const handleOnClose = () => {
        setInputText('');
        setPercent(0);
        setCharsLeft(maxChars);
    }

    React.useEffect(() => {
        return () => {
            handleOnClose();
        }
    }, [open]);

    const calcPercent = Math.floor(percent * 100 / maxChars);

    return (
        <div className='w-full bg-white dark:bg-black/20 dark:text-white rounded-md flex gap-2 p-2'>
            <form onSubmit={handleSubmit} method="get" className='w-full flex flex-col gap-2'>
                <div className="validation flex gap-2">

                </div>
                <textarea
                    value={inputText}
                    onChange={handleChange}
                    maxLength={maxChars}
                    cols={30}
                    rows={3}
                    placeholder='What is in your mind?'
                    className='px-2 py-1 w-full outline-none rounded-md border border-slate-300'
                />


                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative w-10 h-10 rounded-full">
                            <CircularProgressBar text={charsLeft} value={calcPercent} remain={charsLeft} color="text-blue-400" />
                        </div>

                        <Button variant="contained" disabled={!inputText} type="submit">
                            Post a Reply
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}