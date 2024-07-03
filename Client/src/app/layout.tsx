import HomeLayout from "@/components/layouts/home-layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PopupProvider } from "@/contexts/popup-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <PopupProvider>
          <HomeLayout>{children}</HomeLayout>
        </PopupProvider>
        </body>
    </html>
  );
}