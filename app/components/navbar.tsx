import Link from "next/link";
import type { Session } from "next-auth";
import { logout } from "@/app/actions/auth";

const linkClass = "rounded px-3 py-2 text-sm font-medium hover:bg-slate-700";

export function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-wrap items-center gap-1">
          <Link className={linkClass} href="/">
            Home
          </Link>
          <Link className={linkClass} href="/blogs">
            Blogs
          </Link>
          <Link className={linkClass} href="/users">
            Users
          </Link>
          {session?.user && (
            <>
              <Link className={linkClass} href="/blogs/new">
                New Blog
              </Link>
              <Link className={linkClass} href="/me">
                My Page
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          {session?.user ? (
            <>
              <span>{session.user.name}</span>
              <form action={logout}>
                <button
                  className="rounded bg-white px-3 py-1.5 font-medium text-slate-900 hover:bg-slate-200"
                  type="submit"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link className={linkClass} href="/login">
                Login
              </Link>
              <Link className={linkClass} href="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
