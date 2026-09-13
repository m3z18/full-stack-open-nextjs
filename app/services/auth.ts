import { auth } from "@/auth";

export async function getCurrentUser() {
  const session = await auth();
  const id = Number(session?.user?.id);

  if (!Number.isInteger(id) || !session?.user?.username) {
    return undefined;
  }

  return {
    id,
    username: session.user.username,
    name: session.user.name ?? "",
  };
}
