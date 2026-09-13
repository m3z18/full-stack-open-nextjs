"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, likeBlog as updateBlogLikes } from "@/app/services/blogs";
import { getCurrentUser } from "@/app/services/auth";
import { blogFormSchema, type BlogFormState } from "@/app/lib/definitions";

export async function createBlog(
  _previousState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const values = {
    title: typeof formData.get("title") === "string" ? String(formData.get("title")) : "",
    author:
      typeof formData.get("author") === "string"
        ? String(formData.get("author"))
        : "",
    url: typeof formData.get("url") === "string" ? String(formData.get("url")) : "",
  };
  const validatedFields = blogFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the highlighted fields",
      values,
    };
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      message: "You must be logged in to create a blog",
      values,
    };
  }

  await addBlog(validatedFields.data, currentUser.id);

  revalidatePath("/blogs");
  revalidatePath(`/users/${currentUser.username}`);
  revalidatePath("/me");
  redirect("/blogs?notification=Blog%20created");
}

export async function likeBlog(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || !(await updateBlogLikes(id))) {
    return;
  }

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
}
