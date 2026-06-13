import type { Metadata } from "next";
import { Instrument_Serif, DM_Mono, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saviouribok.com"),
  title: {
    default:  "Saviour Ibok — Developer, Analyst & Marketer",
    template: "%s — Saviour Ibok",
  },
  description:
    "Personal portfolio and blog of Saviour Joseph Ibok — full-stack developer, Google-certified data analyst, and digital marketer based in Nigeria.",
  keywords: [
    "Saviour Ibok",
    "web developer Nigeria",
    "data analyst Nigeria",
    "content marketer",
    "Next.js developer",
    "University of Uyo",
  ],
  authors: [{ name: "Saviour Joseph Ibok", url: "https://saviouribok.com" }],
  creator: "Saviour Joseph Ibok",
  openGraph: {
    type:      "website",
    locale:    "en_NG",
    url:       "https://saviouribok.com",
    siteName:  "Saviour Ibok",
    title:     "Saviour Ibok — Developer, Analyst & Marketer",
    description:
      "Personal portfolio and blog of Saviour Joseph Ibok — full-stack developer, Google-certified data analyst, and digital marketer.",
    images: [
      {
        url:    "/og-default.png",
        width:  1200,
        height: 630,
        alt:    "Saviour Ibok — Developer, Analyst & Marketer",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@saviouribok",
    creator:     "@saviouribok",
    title:       "Saviour Ibok — Developer, Analyst & Marketer",
    description: "Personal portfolio and blog of Saviour Joseph Ibok.",
    images:      ["/og-default.png"],
  },
  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-image-preview":    "large",
      "max-snippet":          -1,
    },
  },
  icons: {
    icon:    "/favicon.ico",
    apple:   "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal:    React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmMono.variable} ${geist.variable}`}
    >
      <body>
        <Navbar />
        <main style={{ paddingTop: "64px" }}>
          {children}
        </main>
        {modal}
        <Footer />
      </body>
    </html>
  );
}