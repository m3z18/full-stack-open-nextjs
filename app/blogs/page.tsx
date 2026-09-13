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
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Blogs</h1>

      <form action="/blogs" className="mb-8 flex gap-2">
        <label className="sr-only" htmlFor="filter">
          Search by title
        </label>
        <input
          className="min-w-0 flex-1 rounded border border-slate-300 bg-white px-3 py-2"
          defaultValue={filter}
          id="filter"
          name="filter"
          placeholder="Search by title"
        />
        <button
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          type="submit"
        >
          Search
        </button>
      </form>

      <ul className="space-y-3">
        {blogs.map((blog) => (
          <li className="rounded-lg bg-white p-4 shadow-sm" key={blog.id}>
            <Link
              className="text-lg font-semibold text-blue-700 hover:underline"
              href={`/blogs/${blog.id}`}
            >
              {blog.title}
            </Link>
            <p className="mt-1 text-sm text-slate-600">
              by {blog.author} · {blog.likes} likes
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
