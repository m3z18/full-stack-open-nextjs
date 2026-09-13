"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useNotification } from "./notification-context";

export function NotificationFromSearchParams() {
  const pathname = usePathname();
  const router = useRouter();
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
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [notify, pathname, router, searchParams]);

  return null;
}
