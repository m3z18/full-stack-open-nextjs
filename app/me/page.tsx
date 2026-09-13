import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { markAsRead } from "@/app/actions/reading-list";
import { generateApiToken } from "@/app/actions/token";
import { getUserWithReadingList } from "@/app/services/users";

export default async function MePage() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  if (!Number.isInteger(userId)) {
    redirect("/login?notification=Please%20log%20in&notificationType=error");
  }

  const user = await getUserWithReadingList(userId);

  if (!user) {
    redirect("/login?notification=User%20not%20found&notificationType=error");
  }

  const unreadBlogs = user.readingList.filter((entry) => !entry.read);
  const readBlogs = user.readingList.filter((entry) => entry.read);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">My Page</h1>
        <p className="mt-2 text-lg">{user.name}</p>
        <p className="text-slate-600">@{user.username}</p>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">API token</h2>
          {user.token ? (
            <code className="mt-3 block break-all rounded bg-slate-100 p-3 text-sm">
              {user.token}
            </code>
          ) : (
            <p className="mt-2 text-slate-600">No API token has been generated.</p>
          )}
          <form action={generateApiToken} className="mt-3">
            <button
              className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              type="submit"
            >
              {user.token ? "Generate new token" : "Generate token"}
            </button>
          </form>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Unread blogs</h2>
          {unreadBlogs.length === 0 ? (
            <p className="mt-2 text-slate-600">No unread blogs.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {unreadBlogs.map((entry) => (
                <li
                  className="flex flex-wrap items-center justify-between gap-3 rounded border border-slate-200 p-3"
                  key={entry.id}
                >
                  <Link
                    className="font-medium text-blue-700 hover:underline"
                    href={`/blogs/${entry.blog.id}`}
                  >
                    {entry.blog.title}
                  </Link>
                  <form action={markAsRead}>
                    <input name="entryId" type="hidden" value={entry.id} />
                    <button
                      className="rounded border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
                      type="submit"
                    >
                      Mark as read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Read blogs</h2>
          {readBlogs.length === 0 ? (
            <p className="mt-2 text-slate-600">No read blogs.</p>
          ) : (
            <ul className="mt-3 list-inside list-disc space-y-2">
              {readBlogs.map((entry) => (
                <li key={entry.id}>
                  <Link
                    className="text-blue-700 hover:underline"
                    href={`/blogs/${entry.blog.id}`}
                  >
                    {entry.blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
