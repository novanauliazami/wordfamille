import './globals.css'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Help from '@/components/help'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WordFamille'
}

export function generateStaticParams() {
  return [{locale: "id"}, {locale: "fr"}];
}

export default async function RootLayout({children, params: {locale}}) {
  let messages;
  try {
    messages = (await import(`../../../data/locale/${locale}.json`)).default;
  } catch (error) {

  }
  return (
    <html lang={locale} className="scroll-smooth">
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          {children}
          <Help />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
