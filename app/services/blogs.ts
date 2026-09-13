import { desc, eq, ilike, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogs, readingList } from "@/db/schema";

export type Blog = typeof blogs.$inferSelect;

type NewBlog = Pick<Blog, "title" | "author" | "url">;

export async function getBlogs(filter = ""): Promise<Blog[]> {
  return db
    .select()
    .from(blogs)
    .where(filter ? ilike(blogs.title, `%${filter}%`) : undefined)
    .orderBy(desc(blogs.likes));
}

export async function getBlog(id: number): Promise<Blog | undefined> {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
}

export async function addBlog(blog: NewBlog, userId: number): Promise<Blog> {
  const [newBlog] = await db
    .insert(blogs)
    .values({ ...blog, userId })
    .returning();

  await db.insert(readingList).values({ userId, blogId: newBlog.id });

  return newBlog;
}

export async function likeBlog(id: number): Promise<Blog | undefined> {
  const [blog] = await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
    .returning();

  return blog;
}
