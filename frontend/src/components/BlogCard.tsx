import { Link } from "react-router-dom";
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
type author = {
    name: string
}
export interface BlogCardProps {
    author: author ;
    title: string;
    content: string;
    publishedDate: string;
    profilePic?: string;
    thumbnail?: string;
    tags?: string[];
    id: string
}
export const BlogCard = ({
    author,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
    const contentState = convertFromRaw(JSON.parse(content));
    const html = stateToHTML(contentState);
    return (
        <Link to={`/blog/${id}`}>
            <div className=' p-4 border-b pb-4 border-slate-200 w-screen max-w-screen-md cursor-pointer'>
            <div className=' flex'>
                <div >
                    <Avatar name={author.name} size={"large"} />
                </div>
                
                <div className=' flex flex-col justify-center text-sm pl-2 font-extralight'>{author.name}</div>
                <div className=' flex flex-col justify-center pl-2'>
                    <div className=' h-1  w-1 bg-slate-400 rounded-full'></div>
                </div>
                <div className=' flex flex-col justify-center text-sm pl-2 font-thin text-slate-400'>{publishedDate}</div>
            </div>
            <div className=' text-xl font-semibold pt-2'>{title}</div>
            <div className='text-md pt-2' dangerouslySetInnerHTML={{ __html: html.slice(0, 100)+ "..." }} />
            <div className=' text-sm text-slate-500 pt-4'>
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
        </Link>
    )
}

export function Avatar({ name ,size}: { name: string, size?:'small' | 'large' }) {

    return (<div className={`relative inline-flex items-center justify-center ${size === 'small' ?`w-6 h-6` : "w-8 h-8" } overflow-hidden bg-gray-600 rounded-full hover:bg-gray-800`}>
        <div className={`${size === 'large' ? "text-lg":"text-xs"} font-extralight text-gray-100 dark:text-gray-300`}>{name.split(" ")[0][0].toLocaleUpperCase()}</div>
    </div>)

}


