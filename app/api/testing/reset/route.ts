import { db } from "@/db";
import { blogs, readingList, users } from "@/db/schema";

export async function DELETE() {
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { error: "Testing endpoint disabled in production" },
      { status: 403 },
    );
  }

  await db.delete(readingList);
  await db.delete(blogs);
  await db.delete(users);

  return new Response(null, { status: 204 });
}
