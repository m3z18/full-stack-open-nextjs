import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { RegisterForm } from "@/app/components/register-form";

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/blogs");
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold">Register</h1>
        <RegisterForm />
        <p className="mt-6 text-sm text-slate-600">
          Already registered?{" "}
          <Link className="text-blue-700 hover:underline" href="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
