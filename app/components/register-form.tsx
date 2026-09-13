"use client";

import { useActionState, useEffect } from "react";
import { registerUser } from "@/app/actions/auth";
import { initialRegistrationFormState } from "@/app/lib/definitions";
import { useNotification } from "./notification-context";

const inputClass =
  "w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function Errors({
  errors,
  testId,
}: {
  errors?: string[];
  testId?: string;
}) {
  return errors?.map((error) => (
    <p className="mt-1 text-sm text-red-700" data-testid={testId} key={error}>
      {error}
    </p>
  ));
}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerUser,
    initialRegistrationFormState,
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
        <Errors errors={state.errors?.username} testId="username-error" />
      </div>

      <div>
        <label className="mb-1 block font-medium" htmlFor="name">
          Name
        </label>
        <input
          autoComplete="name"
          className={inputClass}
          defaultValue={state.values.name}
          id="name"
          name="name"
        />
        <Errors errors={state.errors?.name} />
      </div>

      <div>
        <label className="mb-1 block font-medium" htmlFor="password">
          Password
        </label>
        <input
          autoComplete="new-password"
          className={inputClass}
          id="password"
          name="password"
          type="password"
        />
        <Errors errors={state.errors?.password} />
      </div>

      <div>
        <label
          className="mb-1 block font-medium"
          htmlFor="passwordConfirmation"
        >
          Confirm Password
        </label>
        <input
          autoComplete="new-password"
          className={inputClass}
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
        />
        <Errors
          errors={state.errors?.passwordConfirmation}
          testId="passwordConfirm-error"
        />
      </div>

      <button
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        data-testid="register-button"
        disabled={pending}
        type="submit"
      >
        {pending ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
