import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "@/app/services/users";

type UserPageProps = {
  params: Promise<{ username: string }>;
};

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="mt-1 text-slate-600">@{user.username}</p>
        <h2 className="mb-3 mt-8 text-xl font-semibold">Blogs</h2>

        <ul className="list-inside list-disc space-y-2">
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link
                className="text-blue-700 hover:underline"
                href={`/blogs/${blog.id}`}
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
