"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, likeBlog as updateBlogLikes } from "@/app/services/blogs";

export async function createBlog(formData: FormData) {
  const title = formData.get("title");
  const author = formData.get("author");
  const url = formData.get("url");

  if (
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof url !== "string" ||
    !title.trim() ||
    !author.trim() ||
    !url.trim()
  ) {
    throw new Error("Title, author and URL are required");
  }

  await addBlog({
    title: title.trim(),
    author: author.trim(),
    url: url.trim(),
  });

  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function likeBlog(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || !(await updateBlogLikes(id))) {
    return;
  }

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
}
