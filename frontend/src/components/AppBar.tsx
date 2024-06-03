import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { Dropdown } from "./Dropdown"
import { useState } from "react"

export const AppBar = () => {
    const [show, setShow] = useState(false);
    return <div className="border-b flex justify-between align-middle p-5">
        <Link to='/blogs'>
            <div className=" flex flex-col justify-center">
                <div className="font-semibold text-xl  cursor-pointer">Medium</div>
            </div>
        </Link>

        <div className="flex justify-around align-middle">
            <div className="flex flex-col justify-center">
                <Link to={'/publish'}>
                    <button className=" mx-3 text-green-50 bg-green-600 rounded-xl px-4 h-fit"> Publish</button>
                </Link>

            </div>
            <div className=" relative cursor-pointer" onClick={()=>setShow(!show)} >
                <Avatar name="Lalith" size={'large'} />
                <div className=" absolute right-6">
                    <Dropdown show={show}/>
                </div>
            </div>


        </div>
    </div>
} 