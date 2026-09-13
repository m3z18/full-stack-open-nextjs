"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useNotification } from "./notification-context";

export function NotificationFromSearchParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { notify } = useNotification();

  useEffect(() => {
    const message = searchParams.get("notification");

    if (!message) {
      return;
    }

    const type =
      searchParams.get("notificationType") === "error" ? "error" : "success";
    notify(message, type);

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("notification");
    nextParams.delete("notificationType");
    const query = nextParams.toString();
    window.history.replaceState(
      null,
      "",
      query ? `${pathname}?${query}` : pathname,
    );
  }, [notify, pathname, searchParams]);

  return null;
}
