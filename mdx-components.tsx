import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <article className="rounded-lg bg-white p-8 shadow-sm">{children}</article>
      </main>
    ),
    h1: ({ children }) => (
      <h1 className="mb-5 text-4xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-8 text-2xl font-semibold">{children}</h2>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-7 text-slate-700">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-inside list-disc space-y-2 text-slate-700">
        {children}
      </ul>
    ),
    ...components,
  };
}
