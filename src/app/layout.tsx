import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { SavedAnalysesProvider } from "@/context/SavedAnalysesContext";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";

export const metadata: Metadata = {
  title: "Property ROI Calculator",
  description: "Find which property upgrades deliver the highest rental ROI",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ROI Calc",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-screen pb-20">
        <SavedAnalysesProvider>
          <Header />
          <main className="mx-auto max-w-lg px-4 pt-4">{children}</main>
        </SavedAnalysesProvider>
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
