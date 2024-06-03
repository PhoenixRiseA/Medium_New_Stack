
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { BlogComponent } from "../components/BlogComponent";
import { AppBar } from "../components/AppBar";
import { Spinner } from "../components/Spinner";
 const Blog: React.FC = () => {
    const params = useParams();
    const { loading, blog } = useBlog(Number(params.id));
    if (loading) {
        return <>
            <AppBar />
            <div className="flex  w-screen justify-center h-screen items-center">
                <Spinner />
            </div>

        </>
    }
    return <>
        {blog && <BlogComponent blog={blog} />}
    </>
}
export default Blog;