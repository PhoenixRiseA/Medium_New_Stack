import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { BlogCardProps } from "../components/BlogCard";

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogCardProps[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res)=>{
            setBlogs(res.data.blogs);
            setLoading(false);
        })
    },[]);

    return {
        loading,
        blogs
    }
};

export const useBlog = (id:number) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogCardProps>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res)=>{
            setBlog(res.data.blog);
            setLoading(false);
        })
    },[]);

    return {
        loading,
        blog
    }
};