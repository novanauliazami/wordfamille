import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'
import { FaRegCircleXmark } from "react-icons/fa6"

function SearchBox() {
  const [searchData, setSearchData] = useState("")
  const router = useRouter()

  const handleChange = e => {
    setSearchData(e.target.value)
  }

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    router.push(encodeURI("/word/" + searchData))
  }, [searchData])

  return (
    <form className="flex items-center" onSubmit={handleSubmit}> 
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch />
        </div>
        <input
          type="text" id="search"
          className="block text-sm w-full pl-10 p-2.5 rounded-lg"
          placeholder="Masukan kata kerja dalam bahasa Perancis"
          onChange={handleChange}
          value={searchData}
          required />
        {
          searchData.length > 0 &&
            <button 
              type="button"
              onClick={(e) => setSearchData("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <FaRegCircleXmark />
            </button>
        }
      </div>
    </form>
  )
}

export default SearchBox