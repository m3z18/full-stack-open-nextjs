"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { NotificationProvider } from "./notification-context";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <NotificationProvider>{children}</NotificationProvider>
    </SessionProvider>
  );
}
