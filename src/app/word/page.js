'use client'

import Link from "next/link"
import { useState, useEffect } from 'react'
import { server } from '@/lib/config'
import { FaRegTimesCircle } from "react-icons/fa"
import { useSearchParams } from 'next/navigation'

function DefinitionList({definitions}) {

  const ShowDefinition = ({definition, num}) =>{
    return (
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
                <span className="font-semibold capitalize">{definition.word}</span> ({definition.wordClass})
            </p>
            <p className="text-sm text-gray-500">
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

function NotFound() {
  return (
    <p className="font-medium text-center">
      Kata Tidak Ditemukan
    </p>
  )
}

export default  function ShowWord() {
  
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const [wordFamily, setWordFamily] = useState({
    word: query,
    found: false,
    family: null
  })
  
  useEffect(() => {
    fetch(`${server}/word/look?q=${query}`)
      .then((res) => {
        if(res.ok) {
          const data = res.json()
          setWordFamily({
            word: data.word,
            found: true,
            family: data.family
          })
        }
      })
  })

  return (
    <div className="max-w-4xl mx-auto px-2 my-8">
      <div className="w-full p-4 bg-base border border-gray-200 rounded-lg shadow-sm sm:p-8">
        <div className="flex items-center justify-between mb-4">
            <h5 className="capitalize text-xl font-bold py-2 border-b border-accent leading-none">
              { wordFamily.word }
            </h5>
            <Link href="/" className="text-lg">
              <FaRegTimesCircle />
            </Link>
        </div> 
          {wordFamily.found ? <DefinitionList definitions={wordFamily.family} /> : <NotFound />}
      </div>
    </div>
  )
}