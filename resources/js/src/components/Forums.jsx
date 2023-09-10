import * as React from 'react'
import ForumList from "./ForumList";
import ThreadList from './ThreadList';
import Thread from './Thread';
import "../styles/Forums.css";

export default function Forums() {

    const [type, setType] = React.useState("forums");
    const [parentId, setParentId] = React.useState(null);

    const handleClick = (type = 'forums', id) => {
        setType(type)
        setParentId(id);
    }

    console.log(type);

    return (
        <div className='flex flex-col gap-2 mainContainer' >
            {
                type === 'forums' ?
                    <ForumList handleClick={handleClick} /> :
                    type === 'threads' ?
                        <ThreadList forumId={parentId} handleClick={handleClick} /> :
                        type === 'posts' ?
                            <Thread theadId={parentId} handleClick={handleClick} /> : ''
            }
        </div>
    )
}