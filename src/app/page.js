'use client'

import Image from 'next/image'
import SearchBox from '@/components/searchbox'

export default function Home() {
  return (
    <main>
      <section className="bg-base min-h-screen">
        <div className="flex flex-col py-8 px-2 items-center justify-content-center">
          <Image
            src="/french-logo.png"
            width={224} height={224}
            alt="WordFamille Logo"
          />
          <SearchBox />
        </div>
      </section>
    </main>
  )
}
