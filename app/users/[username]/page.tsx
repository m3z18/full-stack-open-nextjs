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
    <main>
      <h1>{user.name}</h1>
      <h2>Blogs</h2>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </main>
  );
}
