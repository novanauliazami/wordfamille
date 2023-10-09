'use client'

import Image from 'next/image'
import SearchBox from '@/components/searchbox'

export default function Home() {
  return (
    <main>
      <section className="bg-base min-h-screen">
        <div className="flex flex-col py-8 px-2 items-center justify-content-center">
          <div>
            <Image
              src="/logo-with-text.png"
              width={264} height={264}
              alt="WorFamille Logo"
            />
          </div>
          <SearchBox />
        </div>
      </section>
    </main>
  )
}
