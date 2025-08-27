import { Barlow } from "next/font/google";
import "../globals.css";

const barlow = Barlow({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

export const metadata = {
  title: "TeachFosys - Web Design & Development",
  description: "TeachFosys specializes in creating user-focused websites and digital solutions.",
  keywords: ["TeachFosys", "web design", "web development", "ecommerce", "digital agency"],
  authors: [{ name: "TeachFosys", url: "https://teachfosys.com" }],
  creator: "TeachFosys",
  publisher: "TeachFosys",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "TeachFosys - Web Design & Development",
    description: "We create modern, user-focused websites and digital solutions.",
    url: "https://teachfosys.com",
    siteName: "TeachFosys",
    images: [
      {
        url: "/graph.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeachFosys - Web Design & Development",
    description: "We create modern, user-focused websites and digital solutions.",
    images: ["/twitter.png"],
    creator: "@teachfosys",
  },
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={`${barlow.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
