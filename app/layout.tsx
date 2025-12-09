import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ZapPoupe - Seu Assistente Financeiro no WhatsApp",
  description:
    "Controle suas finanças direto do WhatsApp. Organize gastos, acompanhe receitas e economize com inteligência.",
  generator: "v0.app",
  icons: {
    icon: "/zappoupe.png",
    apple: "/zappoupe.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}