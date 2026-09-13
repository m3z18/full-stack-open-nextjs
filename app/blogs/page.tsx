const blogs = [
  {
    id: 1,
    title: "Learning Next.js",
    author: "Mohammad",
    url: "https://example.com/nextjs",
    likes: 12,
  },
  {
    id: 2,
    title: "React Server Components",
    author: "Matti",
    url: "https://example.com/react-server-components",
    likes: 8,
  },
  {
    id: 3,
    title: "Full Stack Development",
    author: "University of Helsinki",
    url: "https://fullstackopen.com",
    likes: 20,
  },
];

export default function Blogs() {
  return (
    <main>
      <h1>Blogs</h1>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <strong>{blog.title}</strong> by {blog.author} — {blog.likes} likes
          </li>
        ))}
      </ul>
    </main>
  );
}