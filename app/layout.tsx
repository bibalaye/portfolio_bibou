import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Info } from "./User";
import { Playfair_Display } from 'next/font/google';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: `Portfolio de ${Info.name}`,
  description: Info.bio,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 text-gray-900 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 dark:text-gray-100 transition-colors duration-500`}
      >
        <ul className="circles">
          {[...Array(10)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
        {children}
      </body>
    </html>
  );
}
