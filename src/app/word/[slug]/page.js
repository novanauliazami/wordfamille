import getWordFamilies from "@/lib/wordfamilies"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const wordFamilies = await getWordFamilies()

  return wordFamilies.map((wordFamily) => {
    return {
      params: {
        word: encodeURI(wordFamily.word.toLowerCase())
      }
    }
  })
}

async function getWordFamily(query) {
  const res = await fetch(`http://localhost:3000/word?q=${query}`, { cache: 'no-store' })
  
  if(!res.ok)
    return undefined

  return res.json()
}

function DefinitionList({definitions}) {

  const ShowDefinition = ({word, meaning, index}) =>{
    return (
      <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
                {word}
            </p>
            <p class="text-sm text-gray-500 truncate">
                {meaning}
            </p>
          </div>
          <div class="inline-flex items-center text-base font-semibold text-gray-900">
              { index }
          </div>
        </div>
      </li>
    )
  }
  return (
    <div className="flow-root">
      <ul role="list" className="divide-y divide-gray-200">
        {
          definitions.map((definition, index) => {
            return <ShowDefinition
                      key={index} word={definition.word}
                      meaning={definition.meaning} index={index+1}
                    />
          })
        }
      </ul>
    </div>
  )
}

function DefinitionNotFound({params}) {
  return (
    <div className="max-w-4xl mx-auto px-2 my-8">
      <div className="w-full max-w-md p-4 bg-base border border-gray-200 rounded-lg shadow-sm sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none">
            { decodeURI(params.slug) }
          </h5>
          <Link href="/" className="text-sm font-bold">
            Kembali
          </Link>
        </div>
        <div className="border-t border-gray-200 py-3 sm:py-4">
          <p class="text-sm font-medium truncate">
            Kata Tidak Ditemukan
          </p>
        </div>
      </div>
    </div>
  )
}

export default async function ShowWord({params}){
  const wordFamily = await getWordFamily(params.slug)
  
  if (!wordFamily)
    return <DefinitionNotFound params={params} />

  return (
    <div className="max-w-4xl mx-auto px-2 my-8">
      <div className="w-full max-w-md p-4 bg-base border border-gray-200 rounded-lg shadow-sm sm:p-8">
        <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none">
              { wordFamily.word }
            </h5>
            <span className="text-sm font-bold">
                No
            </span>
        </div>
        <DefinitionList definitions={wordFamily.family} />
      </div>
    </div>
  )
}