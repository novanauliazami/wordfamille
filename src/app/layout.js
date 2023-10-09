import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Help from '@/components/help'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WordFamille'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Header />
        {children}
        <Help />
        <Footer />
      </body>
    </html>
  )
}
