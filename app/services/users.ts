import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

type NewUser = {
  username: string;
  name: string;
  passwordHash: string;
};

export async function getUsers() {
  return db
    .select({ id: users.id, username: users.username, name: users.name })
    .from(users)
    .orderBy(asc(users.name));
}

export async function getUserById(id: number) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

export async function getUserByUsername(username: string) {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  });
}

export async function getUserByToken(token: string) {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    columns: {
      id: true,
      username: true,
      name: true,
    },
  });
}

export async function createUser(user: NewUser) {
  const [newUser] = await db
    .insert(users)
    .values(user)
    .returning({ id: users.id, username: users.username, name: users.name });

  return newUser;
}

export async function setUserToken(id: number, token: string) {
  const [user] = await db
    .update(users)
    .set({ token })
    .where(eq(users.id, id))
    .returning({ id: users.id });

  return user;
}

export async function getUserWithBlogs(username: string) {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    columns: {
      id: true,
      username: true,
      name: true,
    },
    with: {
      blogs: true,
    },
  });
}

export async function getUserWithReadingList(id: number) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      id: true,
      username: true,
      name: true,
      token: true,
    },
    with: {
      readingList: {
        with: {
          blog: true,
        },
      },
    },
  });
}
