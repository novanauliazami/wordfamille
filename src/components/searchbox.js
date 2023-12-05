import { server } from '@/lib/config' 
import { useState, useEffect, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { FaSearch } from 'react-icons/fa'
import { FaRegCircleXmark } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

function ShowOption({option}) {
  if (option.matches[0].key != "word") {
    const i = option.matches[0].refIndex
    const w = option.item.family[i]
    return (<span className="pl-5">{w.word} ({w.wordClass}) = {w.meaning}</span>)
  }
  return (<span className="pl-5">{option.item.word}</span>)
}


function SearchBox(props) {
  const router = useRouter()
  const [searchSuggest, setSearchSuggest] = useState([])
  const [selectedWord, setSelectedWord] = useState("")
  const [query, setQuery] = useState("")
  const [lastSearch, setLastSearch] = useState([])

  useEffect(() => {
    const encodedQuery = encodeURI(query)
    fetch(`${server}/word/search?q=${encodedQuery}`)
      .then((res) => res.json())
      .then((data) => setSearchSuggest(data))
  }, [query])


  useEffect(() => {
    if (Array.isArray(lastSearch) && lastSearch.length)
      window.localStorage.setItem("lastSearch", JSON.stringify(lastSearch.slice(-3)))

    const prevLastSearch = window.localStorage.getItem("lastSearch")
    setLastSearch(JSON.parse(prevLastSearch))
  }, [lastSearch])

  const redirect = (to) => {
    router.push(encodeURI(to))
  } 
  const handleSubmit = ({id, name}) => {
    setSelectedWord(name)
    setLastSearch(lastSearch => [...lastSearch, name])
    
    if(searchSuggest.length > 0) 
      redirect(`/word/${searchSuggest[0].score <= .05 ? searchSuggest[0].item.word : name}`)
    else
      redirect (`/word/${name}`)
  }

  return (
    <div className="w-full">
      <Combobox value={selectedWord} onChange={handleSubmit}>
        <div className="relative w-full">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-base border border-accent">
            <button
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <FaSearch />
            </button>
            <Combobox.Input
              className={`block w-full border-none bg-inherit focus:ring-0 text-sm pl-10 ${props.minimize ? "p-1.5" : "p-2-5"} rounded-lg`}
              placeholder={props.label}
              onChange={(e) => setQuery(e.target.value)} />
            <button 
              type="button"
              onClick={() => setQuery("")}
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
        >
          <Combobox.Options
            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-base py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {query.length > 0 && (
              <Combobox.Option className="hidden" value={{ id: null, name: query }}>
                {query}
              </Combobox.Option>
            )}
            {searchSuggest.map((sugest, index) => (
              <Combobox.Option
                className="relative flex ui-active:bg-gray-200 py-2 px-4 border-t text-gray-700"
                key={sugest.refIndex} value={{id: index, name: sugest.item.word}}>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch />
                </span>
                <ShowOption option={sugest} />
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
