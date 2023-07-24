import "./globals.css"
import type { Metadata } from "next"
import Provider from "@/expeditionContext/expeditionContext"
import TotalSeatProvider from "@/totalSeatContext/totalSeatContext"
import AccountProvider from "@/accountContext/accountContext"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ticket Sales App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Provider>
        <AccountProvider>
          <TotalSeatProvider>
            <body className={inter.className}>{children}</body>
          </TotalSeatProvider>
        </AccountProvider>
      </Provider>
    </html>
  )
}
