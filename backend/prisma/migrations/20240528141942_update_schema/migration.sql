-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
