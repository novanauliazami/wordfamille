import getWordFamilies from "@/lib/wordfamilies"
import Link from "next/link"
import { server } from '@/lib/config'
import { FaRegTimesCircle } from "react-icons/fa"

export async function generateMetadata({ params }) {
  return {
    title: `Definisi Kata ${params.slug} - Wordfamille`,
  }
}
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
  const res = await fetch(`${server}/word/look?q=${query}`, {
    next: {
      revalidate: 3600
    }
  })
  
  if(!res.ok)
    return undefined

  return res.json()
}

function DefinitionList({definitions}) {

  const ShowDefinition = ({definition, num}) =>{
    return (
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
                <span className="font-semibold capitalize">{definition.word}</span> ({definition.wordClass})
            </p>
            <p className="capitalize text-sm text-gray-500">
                {definition.meaning}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-700">
              { num }
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
                      key={index} num={index+1}
                      definition={definition}
                    />
          })
        }
      </ul>
    </div>
  )
}

function DefinitionNotFound({params}) {
  return (
    <div className="container lg:max-w-4xl px-2 my-8">
      <div className="w-full p-4 bg-base border border-gray-200 rounded-lg shadow-sm sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none">
            { decodeURI(params.slug) }
          </h5>
          <Link href="/" className="text-lg">
            <FaRegTimesCircle />
          </Link>
        </div>
        <div className="border-t border-gray-200 py-4 sm:py-6">
          <p className="font-medium text-center">
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
    <div className="container lg:max-w-4xl mx-auto px-2 my-8">
      <div className="w-full p-4 bg-base border border-gray-200 rounded-lg shadow-sm sm:p-8">
        <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold py-2 border-b border-accent leading-none">
              { wordFamily.word }
            </h5>
        </div> 
        <DefinitionList definitions={wordFamily.family} />
      </div>
    </div>
  )
}