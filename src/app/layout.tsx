import { Inter } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

const poppins_init = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${poppins_init.className}  bg-[#F5F5F5]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
