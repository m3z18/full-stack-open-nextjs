"use client";

import { useActionState, useEffect } from "react";
import { createBlog } from "@/app/actions/blogs";
import { initialBlogFormState } from "@/app/lib/definitions";
import { useNotification } from "./notification-context";

const inputClass =
  "w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export function BlogForm() {
  const [state, formAction, pending] = useActionState(
    createBlog,
    initialBlogFormState,
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
        <label className="mb-1 block font-medium" htmlFor="title">
          Title
        </label>
        <input
          className={inputClass}
          defaultValue={state.values.title}
          id="title"
          name="title"
        />
        {state.errors?.title?.map((error) => (
          <p className="mt-1 text-sm text-red-700" key={error}>
            {error}
          </p>
        ))}
      </div>

      <div>
        <label className="mb-1 block font-medium" htmlFor="author">
          Author
        </label>
        <input
          className={inputClass}
          defaultValue={state.values.author}
          id="author"
          name="author"
        />
        {state.errors?.author?.map((error) => (
          <p className="mt-1 text-sm text-red-700" key={error}>
            {error}
          </p>
        ))}
      </div>

      <div>
        <label className="mb-1 block font-medium" htmlFor="url">
          URL
        </label>
        <input
          className={inputClass}
          defaultValue={state.values.url}
          id="url"
          name="url"
        />
        {state.errors?.url?.map((error) => (
          <p className="mt-1 text-sm text-red-700" key={error}>
            {error}
          </p>
        ))}
      </div>

      <button
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        disabled={pending}
        type="submit"
      >
        {pending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
