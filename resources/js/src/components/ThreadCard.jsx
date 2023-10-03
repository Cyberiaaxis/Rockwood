import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function ThreadCard({ item, handleClick }) {
    return (
        <div className="px-2 py-1 w-full flex gap-2">
            <div className="">
                <Avatar alt="Tom" />
            </div>
            <div className="flex flex-auto flex-col">
                <div onClick={() => handleClick('posts', item.url)} className="cursor-pointer w-fit text-lg">
                    {item.title}
                </div>
                <div className="block text-sm">
                    {item.description}
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 w-20">
                <div className="posts text-center">
                    <div className="block text-xs font-semibold">Posts</div>
                    {item?.posts_count}
                </div>
            </div>
            {item?.recentPosts && <div className="flex items-center gap-2 shrink-0 w-60">
                <Avatar alt={item.recentPost.poster.name} src={item.recentPost.poster.avatar} />
                <div className="flex flex-col flex-1">
                    <Link to={item.recentPost.thread.url}>
                        {item.recentPost.thread.title}
                    </Link>
                    <Link to={item.recentPost.poster.url} className="text-sm">
                        by {item.recentPost.poster.name}
                    </Link>
                </div>
            </div>}
        </div>
    )
}