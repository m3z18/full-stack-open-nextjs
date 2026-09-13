"use client";

import { useNotification } from "./notification-context";

export function Notification() {
  const { notification } = useNotification();

  if (!notification) {
    return null;
  }

  const colors =
    notification.type === "error"
      ? "border-red-500 bg-red-50 text-red-800"
      : "border-green-500 bg-green-50 text-green-800";

  return (
    <div
      className={`mx-auto mt-4 w-full max-w-4xl rounded border-l-4 px-4 py-3 ${colors}`}
      role="status"
    >
      {notification.message}
    </div>
  );
}
