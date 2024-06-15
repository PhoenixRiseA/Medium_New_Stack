import { SignupInput } from "@jsnote-gearless-joe/medium-common";
import { ChangeEvent, forwardRef, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { debounce } from "../utils";
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Spinner } from "./Spinner";
import { useSetRecoilState } from "recoil";
import { authState } from "../store/atoms/authState";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const setIsAuthticated = useSetRecoilState(authState);
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: '',
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    async function sendRequest() {
        setLoading(true);
        if(type === 'signin'){
            if(postInputs.username.length === 0 || postInputs.password.length === 0){
                toast.error("Enter Valid Inputs");
                setLoading(false);
                return;
            }
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? "signup" : "signin"}`, { ...postInputs });
            setLoading(false);
            const jwt = response.data;
            sessionStorage.setItem("token", jwt);
            setIsAuthticated(true)
            navigate('/blogs')
        } catch (error:any ) {
            setLoading(false)
            toast.error(error.response.data)
        }

    }
    return <div className="h-screen flex flex-col justify-center " >
        <ToastContainer />
        <div className="text-center text-3xl font-extrabold">
            {type === "signup" ? "Create an account" : "Welcome!"}
        </div>
        <div className=" text-center text-slate-500">
            {type === "signup" ? "Already have an account? " : "Don't have an account? "}<Link to={type === "signup" ? "/signin" : "/signup "} className="pl-2 underline">

                {type === "signup" ? "Login " : "Sign Up "}
            </Link>
        </div>
        <div className=" min-w-40 flex flex-col justify-center   items-center ">
            <LabelledInput ref={usernameRef}  key={'username'} label={"Username"} placeholder={"Lalith_rocks@gmail.com"} onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
                setPostInputs((state) => {
                    return { ...state, username: e.target.value }
                })
            }, 500)} />
            <LabelledInput key={'password'} type={"password"} label={"Password"} placeholder={"*********"} onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
                setPostInputs((state) => {
                    return { ...state, password: e.target.value }
                })
            }, 500)} />
            {type === 'signup' ? <LabelledInput key={'name'} label={"Name"} placeholder={"Lalith"} onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
                setPostInputs((state) => {
                    return { ...state, name: e.target.value }
                })
            }, 500)} /> : null}
            {<button type="button" disabled={loading} onClick={sendRequest} className=" min-w-80 mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{loading ? <div className="flex justify-center"><Spinner/></div> :( type === "signup" ? "Sign Up" : "Sign In")}</button> }

        </div>

    </div>
}
interface LabelledInputType {
    label: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;


}
const LabelledInput = forwardRef<HTMLInputElement, LabelledInputType>( ({ label, onChange, placeholder, type = "text",  }, ref ) => {
    return <div className="min-w-80 pt-6">

        <label className="    font-semibold block mb-2 text-sm  text-gray-900 dark:text-white">{label}</label>
        <input ref={ref}  onChange={onChange}  id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
});