'use client'

import Image from 'next/image'
import SearchBox from '@/components/searchbox'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations("index")
  return (
    <main>
      <section className="container mx-auto min-h-screen">
        <div className="flex flex-col py-8 px-2 items-center justify-content-center">
          <Image
            src="/french-logo.png"
            width={224} height={224}
            className="mb-4"
            alt="WordFamille Logo"
          />
          <SearchBox label={t("search")}/>
        </div>
      </section>
    </main>
  )
}