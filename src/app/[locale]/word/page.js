'use client'

import Image from 'next/image'
import Link from 'next/link'
import SearchBox from '@/components/searchbox'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

function WordsBox({label,words}) {
  return (
    <div className="flex flex-wrap w-full max-w-lg items-center justify-between">
      <p className="basis-2/3">{label}</p>
      <div className="flex basis-3/5 items-center justify-around space-x-3 py-4">
        {
          words.map((word)=> {
            const url = "/word/" + encodeURI(word.toLocaleLowerCase())
            return (
              <Link key={word} href={url}>
                <div className="border border-gray-200 rounded-md bg-inherit font-sm mx-3 px-4 py-1">
                  {word}
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default function Home() {
  const t = useTranslations("index")
  const [lastSearch, setLastSearch] = useState([])
  useEffect(() => {
    const prevLastSearch = window.localStorage.getItem("lastSearch")
    setLastSearch(JSON.parse(prevLastSearch))
  }, [lastSearch])

  const suggestionWords = [
    "s'appeler",
    "La France",
    "La Belge"
  ]

  return (
    <main>
      <section className="container max-w-lg mx-auto min-h-screen">
        <div className="flex flex-col py-8 px-2 items-center">
          <Image
            src="/french-logo.png"
            width={224} height={224}
            className="mb-4"
            alt="WordFamille Logo"
          />
          <SearchBox label={t("search")}/>
          <WordsBox label="Saran Kata" words={suggestionWords} />
          {lastSearch && <WordsBox label="Riwayat Pencarian" words={lastSearch} />}
        </div>
      </section>
    </main>
  )
}