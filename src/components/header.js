'use client'

import Image from 'next/image'
import {
  Navbar
} from 'flowbite-react'
import SearchBox from '@/components/searchbox'


export default function Header() {
  const navlink = [
    {label: "Beranda", target: "/"},
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
                  className="text-white hover:text-gray-200 font-semibold text-lg"
                >
                  {link.label}
                </Navbar.Link>
              )
            })
          }
          <div className="flex order-first md:order-last max-w-full">
            <SearchBox minimize/>
          </div>
        </Navbar.Collapse>
      </Navbar>
  )
}
