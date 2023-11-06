import * as React from 'react'
import { Avatar, Button, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import QuickreplyIcon from '@mui/icons-material/Quickreply';

export default function PostCard({ item }) {
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
                <Typography variant="subtitle2" className="post-header block"> Posted July 22, 2022 </Typography>
                <Typography variant="body2" className="post-body flex flex-col gap-1">
                    {item.content}
                </Typography>

                <div className="post-footer flex items-center justify-between">
                    <Button startIcon={<QuickreplyIcon />} color="inherit">
                        Quote Reply
                    </Button>

                    <div className="right">
                        <Button startIcon={<ReplyIcon />} color="inherit">
                            Reply
                        </Button>
                        <Button startIcon={<FavoriteIcon />} color="inherit">
                            0
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}