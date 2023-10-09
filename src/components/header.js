'use client'

import Image from 'next/image'
import {
  Navbar
} from 'flowbite-react'
import { FaBars, FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'


function SearchBox() {
  const router = useRouter()
  const [searchData, setSearchData] = useState()

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    router.push(encodeURI("/word/" + searchData))
  }, [searchData])

  return (
    <form onSubmit={handleSubmit} className="flex w-full" id="searchHeader">
      <button type="submit"
        form="searchHeader"
        className="inline-flex items-center px-2 text-sm text-white
                 bg-primary border border-r-0 border-white rounded-l-md">
        <FaSearch />
      </button>
      <input
        type="text"
        onChange={(e) => setSearchData(e.target.value)}
        className="border-none rounded-none rounded-r-lg block flex-1 min-w-0 w-full text-sm p-1.5"
        placeholder="CARI"/>
    </form>
  )
}


export default function Header() {
  const navlink = [
    {label: "Home", target: "/"},
    {label: "Evaluasi", target: "/evaluation"},
    {label: "Bantuan", target: "#help"}
  ]

  return (    
      <Navbar className="bg-gradient-to-r from-secondary to-primary">
        <Navbar.Brand href="/">
          <Image
            alt="WordFamille Logo"
            className="mr-3 h-6 sm:h-9"
            src="/logo.png"
            width={36}
            height={36}
          />
          <span className="self-center bg-gradient-to-r from-primary to-primary text-transparent bg-clip-text hidden md:block whitespace-nowrap text-lg font-semibold">
            WordFamille
          </span>
        </Navbar.Brand>
        <Navbar.Toggle className="text-white focus:ring-none" />
        <Navbar.Collapse>
          {
            navlink.map((link, index) => {
              return (
                <Navbar.Link
                  key={index}
                  href={link.target}
                  className="text-white font-semibold text-lg"
                >
                  {link.label}
                </Navbar.Link>
              )
            })
          }
          <div className="flex order-first md:order-last max-w-full">
            <SearchBox />
          </div>
        </Navbar.Collapse>
      </Navbar>
  )
}
