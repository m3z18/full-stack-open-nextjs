import Link from "next/link";
import { LoginForm } from "@/app/components/login-form";

export default async function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold">Login</h1>
        <LoginForm />
        <p className="mt-6 text-sm text-slate-600">
          No account?{" "}
          <Link className="text-blue-700 hover:underline" href="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
