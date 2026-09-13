import Link from "next/link";
import { getUsers } from "@/app/services/users";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Users</h1>

      <ul className="space-y-3">
        {users.map((user) => (
          <li className="rounded-lg bg-white p-4 shadow-sm" key={user.id}>
            <Link
              className="font-semibold text-blue-700 hover:underline"
              href={`/users/${user.username}`}
            >
              {user.name}
            </Link>
            <p className="text-sm text-slate-600">@{user.username}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
