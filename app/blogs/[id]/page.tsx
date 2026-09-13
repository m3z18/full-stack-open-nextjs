import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { likeBlog } from "@/app/actions/blogs";
import { addToReadingList } from "@/app/actions/reading-list";
import { getBlog } from "@/app/services/blogs";

type BlogPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const id = Number((await params).id);
  const [blog, session] = await Promise.all([
    Number.isInteger(id) ? getBlog(id) : undefined,
    auth(),
  ]);

  if (!blog) {
    notFound();
  }

  const currentUserId = Number(session?.user?.id);
  const canAddToReadingList =
    Number.isInteger(currentUserId) && blog.userId !== currentUserId;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article
        className="rounded-lg bg-white p-6 shadow-sm"
        data-testid="blog-detail"
      >
        <h1 className="text-3xl font-bold" data-testid="blog-title">
          {blog.title}
        </h1>
        <dl className="mt-6 space-y-3">
          <div>
            <dt className="font-semibold">Author</dt>
            <dd data-testid="blog-author">{blog.author}</dd>
          </div>
          <div>
            <dt className="font-semibold">URL</dt>
            <dd>
              <a
                className="break-all text-blue-700 hover:underline"
                href={blog.url}
              >
                {blog.url}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Likes</dt>
            <dd>{blog.likes}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <form action={likeBlog}>
            <input name="id" type="hidden" value={blog.id} />
            <button
              className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              type="submit"
            >
              Like
            </button>
          </form>

          {canAddToReadingList && (
            <form action={addToReadingList}>
              <input name="blogId" type="hidden" value={blog.id} />
              <button
              className="rounded border border-blue-600 px-4 py-2 font-medium text-blue-700 hover:bg-blue-50"
              data-testid="add-to-reading-list-button"
                type="submit"
              >
                Add to reading list
              </button>
            </form>
          )}
        </div>
      </article>
    </main>
  );
}
