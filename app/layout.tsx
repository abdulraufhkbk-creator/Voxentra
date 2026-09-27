import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Voxentra — See beyond the feed | NTRO SIH26152",
  description: "Advanced Social Media Analytics platform for National Technical Research Organisation. Threat detection, bot analysis, sentiment tracking.",
  keywords: ["NTRO", "SIH26152", "Social Media Analytics", "OSINT", "Threat Intel"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white">
        {children}
      </body>
    </html>
  )
}
