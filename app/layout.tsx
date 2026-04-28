import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo application with local storage persistence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-blue-50">{children}</body>
    </html>
  );
}
