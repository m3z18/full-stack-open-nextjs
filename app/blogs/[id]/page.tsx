import { likeBlog } from "@/app/actions/blogs";
import { getBlog } from "@/app/services/blogs";
import { notFound } from "next/navigation";

type BlogPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const id = Number((await params).id);
  const blog = Number.isInteger(id) ? getBlog(id) : undefined;

  if (!blog) {
    notFound();
  }

  return (
    <main>
      <h1>{blog.title}</h1>
      <p>Author: {blog.author}</p>
      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>Likes: {blog.likes}</p>

      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
    </main>
  );
}
