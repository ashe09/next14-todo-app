import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";

import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js 14 ToDo App",
  description: "Next.js 14で簡易的なToDo Appを作成しました。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
