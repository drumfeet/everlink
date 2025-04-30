import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { WalletProvider } from "@/context/wallet-context"
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "everlink.fun",
  description: "Permanent web page for your digital profile",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <WalletProvider>
          {children}
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  )
}
