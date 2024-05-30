import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = () => {
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
            <Avatar name="Lalith" size={'large'} />
        </div>
    </div>
} 