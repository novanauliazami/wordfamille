'use client'

import Image from 'next/image'
import Link from 'next/link'
import SearchBox from '@/components/searchbox'
import { useTranslations } from 'next-intl'

function SuggestionWords() {
  const suggestionWords = [
    "s'appeler",
    "La France",
    "La Belge"
  ]

  return (
    <div className="w-full max-w-lg flex justify-around py-4">
      {
        suggestionWords.map((word)=> {
          const url = "/word/" + encodeURI(word.toLocaleLowerCase())
          return (
            <Link key={word} href={url}>
              <div className="border border-gray-200 bg-inherit px-3 py-1">
                {word}
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default function Home() {
  const t = useTranslations("index")
  return (
    <main>
      <section className="container mx-auto min-h-screen">
        <div className="flex flex-col py-8 px-2 items-center">
          <Image
            src="/french-logo.png"
            width={224} height={224}
            className="mb-4"
            alt="WordFamille Logo"
          />
          <SearchBox label={t("search")}/>
          <SuggestionWords />
        </div>
      </section>
    </main>
  )
}