import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { readingList } from "@/db/schema";

export async function addReadingListEntry(userId: number, blogId: number) {
  await db
    .insert(readingList)
    .values({ userId, blogId })
    .onConflictDoNothing({
      target: [readingList.userId, readingList.blogId],
    });
}

export async function markReadingListEntryRead(id: number, userId: number) {
  const [entry] = await db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.id, id), eq(readingList.userId, userId)))
    .returning({ id: readingList.id });

  return entry;
}
