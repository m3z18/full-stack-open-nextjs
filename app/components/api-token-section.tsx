"use client";

import { useActionState, useEffect } from "react";
import {
  generateApiToken,
  type ApiTokenState,
} from "@/app/actions/token";
import { useNotification } from "./notification-context";

export function ApiTokenSection({ token }: { token: string | null }) {
  const initialState: ApiTokenState = { token };
  const [state, formAction, pending] = useActionState(
    generateApiToken,
    initialState,
  );
  const { notify } = useNotification();

  useEffect(() => {
    if (state.message) {
      notify(state.message);
    }
  }, [notify, state.message, state.token]);

  return (
    <section className="mt-8" data-testid="api-token-section">
      <h2 className="text-xl font-semibold">API token</h2>
      {pending ? (
        <p className="mt-2 text-slate-600">Generating token...</p>
      ) : state.token ? (
        <div data-testid="token-display">
          <code
            className="mt-3 block break-all rounded bg-slate-100 p-3 text-sm"
            data-testid="api-token"
          >
            {state.token}
          </code>
        </div>
      ) : (
        <p className="mt-2 text-slate-600" data-testid="no-token-message">
          No API token has been generated.
        </p>
      )}
      <form action={formAction} className="mt-3">
        <button
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          data-testid="generate-token-button"
          disabled={pending}
          type="submit"
        >
          {pending
            ? "Generating..."
            : state.token
              ? "Generate new token"
              : "Generate token"}
        </button>
      </form>
    </section>
  );
}
