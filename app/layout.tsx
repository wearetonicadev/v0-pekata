import "./globals.css";

import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { AuthenticatedLayout } from "@/components/layouts/AuthenticatedLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Pekata Backoffice",
  description: "Pekata",
  generator: "Pekata",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans">
        <Providers>
          <AuthenticatedLayout>{children}</AuthenticatedLayout>
        </Providers>
      </body>
    </html>
  );
}
