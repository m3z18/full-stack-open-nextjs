import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { auth } from "@/auth";
import { Navbar } from "@/app/components/navbar";
import { Notification } from "@/app/components/notification";
import { NotificationFromSearchParams } from "@/app/components/notification-from-search-params";
import { Providers } from "@/app/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "Full Stack Open Next.js Blog App",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <Providers session={session}>
          <Navbar session={session} />
          <Suspense fallback={null}>
            <NotificationFromSearchParams />
          </Suspense>
          <Notification />
          <div className="flex-1">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
