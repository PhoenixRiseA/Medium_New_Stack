import { useNavigate } from "react-router-dom";

export const Dropdown = ({show}:{show:boolean}) => {
    const navigate = useNavigate();
    return <>

        <div id="dropdownHover" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700" hidden={!show}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                
                <li>
                    <a onClick={()=>{
                        sessionStorage.removeItem('token');
                        navigate('/signin');
                    }} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                </li>
            </ul>
        </div>
    </>
}