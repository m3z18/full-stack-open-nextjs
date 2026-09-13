"use client";

import { useActionState, useEffect } from "react";
import { login } from "@/app/actions/auth";
import { initialLoginFormState } from "@/app/lib/definitions";
import { useNotification } from "./notification-context";

const inputClass =
  "w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    login,
    initialLoginFormState,
  );
  const { notify } = useNotification();

  useEffect(() => {
    if (state.message) {
      notify(state.message, "error");
    }
  }, [notify, state.message]);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="mb-1 block font-medium" htmlFor="username">
          Username
        </label>
        <input
          autoComplete="username"
          className={inputClass}
          defaultValue={state.values.username}
          id="username"
          name="username"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium" htmlFor="password">
          Password
        </label>
        <input
          autoComplete="current-password"
          className={inputClass}
          id="password"
          name="password"
          type="password"
        />
      </div>

      {state.message && (
        <p className="text-sm text-red-700" role="alert">
          {state.message}
        </p>
      )}

      <button
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        disabled={pending}
        type="submit"
      >
        {pending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
