import bcrypt from "bcryptjs";
import { createUser, getUserByUsername } from "@/app/services/users";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { error: "Testing endpoint disabled in production" },
      { status: 403 },
    );
  }

  const body: unknown = await request.json();

  if (
    !body ||
    typeof body !== "object" ||
    !("username" in body) ||
    !("name" in body) ||
    !("password" in body) ||
    typeof body.username !== "string" ||
    typeof body.name !== "string" ||
    typeof body.password !== "string" ||
    !body.username ||
    !body.name ||
    !body.password
  ) {
    return Response.json({ error: "Invalid user data" }, { status: 400 });
  }

  if (await getUserByUsername(body.username)) {
    return Response.json({ error: "Username is already taken" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(body.password, 10);
  const user = await createUser({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  return Response.json(user, { status: 201 });
}
