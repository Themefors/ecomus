import { Playfair_Display, Merriweather } from "next/font/google";
import "../globals.css";
import Announcement from "@/Components/Shared/Announcement/Announcement";
import Navbar from "@/Components/Shared/Navbar/Navbar";
import Footer from "@/Components/Shared/Footer/Footer";

// Headings font
const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"], 
  subsets: ["latin"],
  variable: "--font-playfair",
});

// Body font
const merriweather = Merriweather({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${merriweather.variable} antialiased min-h-screen flex flex-col`}
      >
        <Announcement />
        <Navbar />
        
        {/* Main content */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

