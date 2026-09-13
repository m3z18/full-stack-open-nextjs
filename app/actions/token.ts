"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/services/auth";
import { setUserToken } from "@/app/services/users";

export async function generateApiToken() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login?notification=Please%20log%20in&notificationType=error");
  }

  await setUserToken(currentUser.id, randomUUID());
  revalidatePath("/me");
  redirect("/me?notification=API%20token%20generated");
}
