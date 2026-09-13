export type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

const blogs: Blog[] = [
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

export function getBlogs(): readonly Blog[] {
  return blogs;
}

export function getBlog(id: number): Blog | undefined {
  return blogs.find((blog) => blog.id === id);
}

export function addBlog(blog: Omit<Blog, "id" | "likes">): Blog {
  const newBlog: Blog = {
    id: Math.max(0, ...blogs.map((blog) => blog.id)) + 1,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: 0,
  };

  blogs.push(newBlog);

  return newBlog;
}

export function likeBlog(id: number): Blog | undefined {
  const blog = getBlog(id);

  if (!blog) {
    return undefined;
  }

  blog.likes += 1;

  return blog;
}
