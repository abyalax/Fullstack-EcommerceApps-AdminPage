import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToasterProvider } from "../providers/toast-provider";
import { ModalProvider } from "../providers/modal-provider";
import { GlobalContextProvider } from "@/context/user-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin App Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider afterSignOutUrl={"/sign-in"} signUpUrl="/sign-up" signInUrl="/sign-in">
      <GlobalContextProvider>
        <html lang="en">
          <body className={inter.className}>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </body>
        </html>
      </GlobalContextProvider>
    </ClerkProvider>
  );
}
