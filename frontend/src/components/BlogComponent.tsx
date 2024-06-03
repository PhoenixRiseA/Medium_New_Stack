import { AppBar } from "./AppBar"
import { Avatar, BlogCardProps } from "./BlogCard";
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
export const BlogComponent = ({ blog }: { blog: BlogCardProps }) => {
    const contentState = convertFromRaw(JSON.parse(blog.content));
    const html = stateToHTML(contentState);
    return <div>
        <AppBar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl pt-12">
                <div className="  col-span-8">
                    <div className="text-2xl font-extrabold">{blog.title} </div>
                    <div className=" text-gray-500 pb-3">Posted on Aughust 24,2023</div>
                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: html }}/>
                </div>
                <div className="col-span-4">
                    <div className=" font-semibold text-lg pb-4 text-slate-500">{ "Author"}</div>
                    <div className="flex gap-4 " >
                        <div className="flex items-center" ><div><Avatar name={blog.author.name} size={'small'}/></div></div>
                        <div className=" flex flex-col gap-2 align-middle justify-center">
                            <div className=" font-bold text-xl">{blog.author.name ||"Jokester"}</div>
                            <div className=" text-wrap text-slate-400">Maser of earth, purveyor of puns, and the funniest person in the kingdom</div>

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
}