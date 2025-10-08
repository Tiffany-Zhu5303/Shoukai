import { Kanit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AnimeProvider } from "./context/AnimeProvider";

const kanit = Kanit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: "Shoukai",
  description: "Tired of figuring out what to watch? Shoukai is here to help with random anime and character recommendations! Save your favoorite finds and keep track of your history.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${kanit.className} antialiased`}
      >
        <AnimeProvider>
          <Navbar />
          {children}
        </AnimeProvider>
      </body>
    </html>
  );
}
