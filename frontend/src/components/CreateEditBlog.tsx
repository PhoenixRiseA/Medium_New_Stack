import { useState, memo } from "react"
import { AppBar } from "./AppBar"
import { debounce } from "../utils"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { CreateBlogInput } from "@jsnote-gearless-joe/medium-common";
import { RichTextEditor } from "./RichTextEditor/RichTextEditor";

import { EditorState,  convertToRaw } from 'draft-js';

export const  CreateEditBlog = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const [input, setInput] = useState<CreateBlogInput>({
        title: "",
        content: "",
        thumbnail: ""
    });
    const navigate = useNavigate();

    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput((state) => {
            return { ...state, title: e.target.value }
        })
    };
    const publishHandler:()=>void = async () =>{
       const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{...input,content:JSON.stringify(convertToRaw(editorState.getCurrentContent())) },{
            headers:{
                Authorization: sessionStorage.getItem('token')
            }
        });
        navigate(`/blog/${response.data.id}`)
    };
    const handleEditorChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
      };

   
    return <div>
        <AppBar />
        <div className="flex justify-center  pt-8">
            <div className=" max-w-screen-lg w-full" >
                <input onChange={debounce(titleChangeHandler, 500)} type="text" id="helper-text" aria-describedby="helper-text-explanation" className=" border-l-2 border-gray-300 focus:outline-none max-w-screen-lg text-3xl text-gray-900  block w-full p-2 " placeholder="Title"></input>

                
                <RichTextEditor 
                        editorState={editorState}
                        onEditorChange={handleEditorChange}
                />
                <button onClick={publishHandler} className=" w-fit px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-gray-800">
                    Publish
                </button>
            </div>

        </div>




    </div>
}
const MemoizedCreateEditBlog = memo(CreateEditBlog);
export { MemoizedCreateEditBlog };

// const TextEditor = ({ onChange }: { onChange: Function }) => {
//     return <>

//         <div className=" max-w-screen-lg w-full">
//             <div className="w-full mb-4 borderrounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
//                 <div className="  px-2 py-2 min-h-64 bg-white rounded-b-lg ">
//                     <label className="sr-only row-span-1">Publish post</label>
//                     <textarea onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), 500)} id="editor" className=" text-xl focus:outline-none  block w-full px-0  text-gray-800 bg-white border-0 " placeholder="Write an article..." required ></textarea>
//                 </div>

//             </div>

//         </div>

//     </>
// }