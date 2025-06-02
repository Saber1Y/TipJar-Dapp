// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import { Sora, Source_Code_Pro, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";


// ✅ New fonts
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const sourceCode = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

export const metadata = {
  title: "TipJar",
  description: "A crypto tip jar built on Anvil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${sourceCode.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased">
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
