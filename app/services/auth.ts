import { auth } from "@/auth";
import { getUserById } from "@/app/services/users";

export async function getCurrentUser() {
  const session = await auth();
  const id = Number(session?.user?.id);

  if (!Number.isInteger(id)) {
    return undefined;
  }

  return getUserById(id);
}
