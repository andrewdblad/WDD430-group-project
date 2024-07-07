import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Handcrafted Haven",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* Default favicon (light mode) */}
            <link rel="icon" href="../../favicon-light.ico" media="(prefers-color-scheme: light)" />
            {/* Dark mode favicon */}
            <link rel="icon" href="../../favicon-dark.ico" media="(prefers-color-scheme: dark)" />
            <body className={inter.className}>{children}</body>
        </html>
    );
}
