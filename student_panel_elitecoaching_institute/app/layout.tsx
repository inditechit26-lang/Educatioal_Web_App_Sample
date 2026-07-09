import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Workspace · EliteCoaching",
  description: "A focused learning workspace for EliteCoaching students.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
