import { server } from '@/lib/config' 
import { useState, useEffect, Fragment, useCallback } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { FaSearch } from 'react-icons/fa'
import { FaRegCircleXmark } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

function SearchBox() {
  const [searchSuggest, setSearchSuggest] = useState([])
  const [selectedWord, setSelectedWord] = useState("")
  const [query, setQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const encodedQuery = encodeURI(query)
    fetch(`${server}/word/search?q=${encodedQuery}`)
      .then((res) => res.json())
      .then((data) => setSearchSuggest(data))
  }, [query])

  const redirect = (to) => {
    router.push(encodeURI(to))
  } 
  const handleSubmit = useCallback(e => {
    e.preventDefault()
    redirect("/word/" + searchSuggest[0].item.word)
  }, [query])

  return (
    <div className="w-72">
      <Combobox as="form" value={selectedWord} onChange={setSelectedWord} onSubmit={handleSubmit}>
        <div className="relative w-full">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg border border-accent">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch />
            </div>
            <Combobox.Input
              className="block border-none focus:ring-0 text-sm bg-inherit pl-10 p-2 rounded-lg"
              placeholder="Masukan kata kerja dalam bahasa Perancis"
              onChange={(e) => setQuery(e.target.value)} />
            <button 
              type="button"
              onClick={(e) => setQuery("")}
              className={`absolute inset-y-0 right-0 flex items-center pr-3 ${query.length > 0 ? "  " : "hidden"}`}
            >
              <FaRegCircleXmark />
            </button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-base py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {searchSuggest.map((sugest) => (
              <Combobox.Option
                onClick={() => redirect("/word/" + sugest.item.word)}
                className="relative cursor-default select-none py-2 px-4 border-t text-gray-700"
                key={sugest.refIndex} value={sugest.matches[0].value}>
                {sugest.matches[0].value}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchBox;