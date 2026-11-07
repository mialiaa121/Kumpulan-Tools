import { Plus_Jakarta_Sans } from "next/font/google";
import { loadSite } from "../lib/loadContent";
import "./globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-main" });

export function generateMetadata() {
  const site = loadSite();
  return {
    title: `${site.title} | ${site.brand}`,
    description: "Pilih jenis konten, isi brief, lanjut ke ChatGPT dengan knowledge siap pakai.",
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={font.variable}>
      <body>{children}</body>
    </html>
  );
}
