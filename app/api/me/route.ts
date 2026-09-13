import { getUserByToken } from "@/app/services/users";

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");
  const match = authorization?.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserByToken(match[1]);

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json(user);
}
