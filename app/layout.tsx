import "./globals.css";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { ReactNode } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { getSession } from "@/lib/session";

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
  const session = await getSession();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="font-sans">
        {session ? (
          <>
            <Header />

            <SidebarProvider>
              <AppSidebar />

              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
            <Footer />
          </>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  );
}
