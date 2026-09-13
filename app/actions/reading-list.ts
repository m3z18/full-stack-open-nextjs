"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/services/auth";
import { getBlog } from "@/app/services/blogs";
import {
  addReadingListEntry,
  markReadingListEntryRead,
} from "@/app/services/reading-list";

export async function addToReadingList(formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login?notification=Please%20log%20in&notificationType=error");
  }

  const blogId = Number(formData.get("blogId"));
  const blog = Number.isInteger(blogId) ? await getBlog(blogId) : undefined;

  if (!blog || blog.userId === currentUser.id) {
    return;
  }

  await addReadingListEntry(currentUser.id, blog.id);
  revalidatePath("/me");
  revalidatePath(`/blogs/${blog.id}`);
  redirect(`/blogs/${blog.id}?notification=Added%20to%20reading%20list`);
}

export async function markAsRead(formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login?notification=Please%20log%20in&notificationType=error");
  }

  const entryId = Number(formData.get("entryId"));

  if (!Number.isInteger(entryId)) {
    return;
  }

  const updatedEntry = await markReadingListEntryRead(
    entryId,
    currentUser.id,
  );

  if (!updatedEntry) {
    return;
  }

  revalidatePath("/me");
  redirect("/me?notification=Blog%20marked%20as%20read");
}
