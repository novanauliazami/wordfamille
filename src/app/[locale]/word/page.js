'use client'

import Image from 'next/image'
import Link from 'next/link'
import SearchBox from '@/components/searchbox'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

function WordsBox({label,words}) {
  return (
    <div className="w-full py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <p className="basis-2/5">{label}</p>
      <div className="flex flex-wrap basis-3/5 items-center justify-between">
        {
          words.map((word)=> {
            const url = "/word/" + encodeURI(word.toLocaleLowerCase())
            return (
              <Link key={word} href={url}>
                <div className="border border-gray-200 rounded-md bg-inherit whitespace-nowrap m-1 text-sm px-3 py-1">
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
    const prevRawLastSearch = window.localStorage.getItem("lastSearch")
    const prevLastSearch = JSON.parse(prevRawLastSearch)
    if (prevLastSearch)
      setLastSearch(Array.isArray(prevLastSearch) ? prevLastSearch : [prevLastSearch])
  }, [JSON.stringify(lastSearch)])

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
          {lastSearch.length && <WordsBox label="Riwayat Pencarian" words={lastSearch} />}
        </div>
      </section>
    </main>
  )
}