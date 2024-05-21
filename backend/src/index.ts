import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string
  }
}>()

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


export default app;

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiYjA1N2YwN2QtODE5Zi00ZTFlLTg5YmEtZTExMTU3YmJiYmM0IiwidGVuYW50X2lkIjoiMzJmODVmOWE5ZTI4YWI4YjVjMjEyYTI0ZTY5ZTRjZjRjN2FmYTRmMjFiZGRlYTA4ZjFlNThhYWFjMmY5ZGVmMiIsImludGVybmFsX3NlY3JldCI6IjNhZmUzNjIzLTQ0Y2ItNDA3MS05NzIyLTkyOGNjMDQ4OTc3MSJ9.g2Z6uomAvfKLbPU7rPLsU0K2_JYrr3paseBOf4Wj-60"
// postgresql://sailalith1993:BhwATX0ym9ku@ep-odd-river-38558734.us-east-2.aws.neon.tech/neondb?sslmode=require