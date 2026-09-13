"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/services/auth";
import { setUserToken } from "@/app/services/users";

export type ApiTokenState = {
  token: string | null;
  message?: string;
};

export async function generateApiToken(
  _previousState: ApiTokenState,
): Promise<ApiTokenState> {
  void _previousState;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login?notification=Please%20log%20in&notificationType=error");
  }

  const token = randomUUID();
  await setUserToken(currentUser.id, token);
  revalidatePath("/me");

  return { token, message: "API token generated" };
}
