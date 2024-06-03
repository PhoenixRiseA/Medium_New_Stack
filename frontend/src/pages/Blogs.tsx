
import { BlogCard } from '../components/BlogCard'
import { AppBar } from '../components/AppBar'
import { useBlogs } from '../hooks'
import { BlogSkeleton } from '../components/BlogSkeleton';
const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <>
            <AppBar />
            <div className='flex flex-col overflow-y-hidden  items-center w-full'>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </>
    }
    return (
        <div className=' h-screen'>
            <AppBar />
            <div className=' flex justify-center'>
                <div >
                    {blogs.length > 0 ?  blogs.map((blog, index) => {
                        return <div key={`blog${index}`}>
                            <BlogCard
                                {...blog}
                                publishedDate='22nd Feb, 2024'
                            />
                        </div>
                    }) : <div>Be the first to blog away</div>}
                 
                </div>

            </div>
        </div>

    )
}
export default Blogs;