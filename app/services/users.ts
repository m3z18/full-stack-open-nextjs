import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function getUsers() {
  return db.select().from(users).orderBy(asc(users.name));
}

export async function getUserWithBlogs(username: string) {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: true,
    },
  });
}
