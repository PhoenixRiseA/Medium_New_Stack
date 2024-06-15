import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify, decode } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@jsnote-gearless-joe/medium-common";
export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
      
    },
    Variables: {
        userId: string;
    }
  }>();

  blogRouter.use('/*', async (c, next)=>{

    const authHeader= c.req.header("authorization") || "";
    
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if(user){
            c.set("userId",user.id);
            await next();
        }else {
            c.status(403);
            return c.json(
                {message: " You are not logged in"}
            )
        }
    } catch (error) {
        c.status(403);
        return c.json(
            {message: " Failed to login"}
        )
    }

  })
  blogRouter.post('/',async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.text("Invalid types");
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const authorId = c.get('userId');
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId),
            thumbnail: body.thumbnail
        }
    })
    return c.json({
        id: blog.id
    })
  });
  
  blogRouter.put('/',async (c) => {
    const body = await c.req.json();
    const {success}  = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.text("Invalid types");
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const authorId = c.get('userId');
    const blog = await prisma.blog.update({
        where:{
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
            authorId: Number( authorId),
            thumbnail: body?.thumbnail
        }
    })
    return c.json({
       id: blog.id
    })
  });
    // todo: add pagination
    blogRouter.get('/bulk',async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());
          try {
            const blogs  = await prisma.blog.findMany({
                select:{
                    content:true,
                    title: true,
                    id: true,
                    author:{
                        select: {
                            name: true
                        }
                    }
                }
            })
            return c.json({blogs})
          } catch (error) {
            return c.json({
                message: "Error while fetching buld blogs"
            })
          }
       
      });
  blogRouter.get('/:id',async (c) => {
    const id = await c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.blog.findFirst({
            where:{
                id: Number(id)
            },
            select:{
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true,

                    }
                },
                authorId: true
            }
    
        })
        if(blog){
            return c.json({
                blog
             })
        }else{
            c.status(404);
            return c.json({
                message: "Blog not found"
            })
        }

     
    } catch (error) {
        c.status(411); //4
        return c.json({
            message: "Error whilte fetching blog"
        })
    }

  });

  blogRouter.delete('/:id',async (c) => {
    const id = await c.req.param("id");
    const authorId = c.get('userId');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blogAuthorId = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                authorId: true
            }
        })
        if(Number(authorId) !== blogAuthorId?.authorId){
            c.status(404);
            return c.json({
                message: "Only the author can delete their blog"
            })
        }
        const deletedBlog = await prisma.blog.delete({
            where:{
                id: Number(id)
            }
        })

        if(deletedBlog){
            return c.json({
                deletedBlog
             })
        }else{
            c.status(404);
            return c.json({
                message: "Blog not found"
            })
        }

     
    } catch (error) {
        c.status(411); //4
        return c.json({
            message: error
        })
    }

  });