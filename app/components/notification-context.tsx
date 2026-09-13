"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type NotificationType = "success" | "error";

type Notification = {
  message: string;
  type: NotificationType;
};

type NotificationContextValue = {
  notification: Notification | null;
  notify: (message: string, type?: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback(
    (message: string, type: NotificationType = "success") => {
      setNotification({ message, type });

      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => setNotification(null), 4000);
    },
    [],
  );

  useEffect(
    () => () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    },
    [],
  );

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return context;
}
