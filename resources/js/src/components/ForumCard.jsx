import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function ForumCard({ item }) {
    return (
        <div className="px-2 py-1 w-full flex">
            <div className="icon shrink-0">

            </div>
            <div className="flex flex-auto flex-col">
                <Link to={`/forums/forum/${item.id}`} className="block text-lg">
                    {item.title}
                </Link>
                <div className="block text-sm">
                    {item.description}
                </div>
                <div className="flex item-center gap-2">

                    {item?.subForums && item.subForums?.length ? item.subForums.map((x, i) =>
                        <Link key={i} to={x.url} className="">
                            {x.name}
                        </Link>
                    ) : ''}

                </div>
            </div>
            <div className="flex items-center justify-center gap-2 w-40">
                <div className="threads text-center">
                    <div className="block text-xs font-semibold">Threads</div>
                    {item.stats.threads}
                </div>
                <div className="posts text-center">
                    <div className="block text-xs font-semibold">Posts</div>
                    {item.stats.posts}
                </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <Avatar alt={item.recentPost.poster.name} src={item.recentPost.poster.avatar} />
                <div className="flex flex-col flex-1">
                    <Link to={item.recentPost.thread.url}>
                        {item.recentPost.thread.title}
                    </Link>
                    <Link to={item.recentPost.poster.url} className="text-sm">
                        by {item.recentPost.poster.name}
                    </Link>
                </div>
            </div>
        </div>
    )
}