import Link from "next/link";
import { getBlogs } from "@/app/services/blogs";

type BlogsPageProps = {
  searchParams: Promise<{ filter?: string | string[] }>;
};

export default async function Blogs({ searchParams }: BlogsPageProps) {
  const filterParam = (await searchParams).filter;
  const filter = Array.isArray(filterParam) ? filterParam[0] : filterParam ?? "";
  const blogs = await getBlogs(filter);

  return (
    <main>
      <h1>Blogs</h1>

      <form action="/blogs">
        <label>
          Search by title
          <input name="filter" defaultValue={filter} />
        </label>
        <button type="submit">Search</button>
      </form>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
            {" — "}
            {blog.likes} likes
          </li>
        ))}
      </ul>
    </main>
  );
}
