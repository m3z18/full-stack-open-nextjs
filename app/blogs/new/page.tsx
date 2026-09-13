import { BlogForm } from "@/app/components/blog-form";

export default async function NewBlog() {
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold">Create new blog</h1>
        <BlogForm />
      </div>
    </main>
  );
}
