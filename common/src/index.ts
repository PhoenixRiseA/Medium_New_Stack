import z from 'zod';

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6).max(20),
    name: z.string().optional()    
})

// type inference in zod

export type SignupInput = z.infer<typeof signupInput>;

export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6)
});
export type SigninInput = z.infer<typeof signinInput>;

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    thumbnail: z.string().optional()
});

export type CreateBlogInput = z.infer<typeof createBlogInput>;

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    thumbnail: z.string().optional(),
    id: z.number()
});

export type UpdateBlogInput = z.infer<typeof updateBlogInput>;