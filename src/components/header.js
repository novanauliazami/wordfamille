'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next-intl/client'
import { Navbar } from 'flowbite-react'
import SearchBox from '@/components/searchbox'
import { Menu, Transition } from '@headlessui/react'
import { HiLanguage } from 'react-icons/hi2'

function LanguageOption({locale}) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <Menu as="div" className="relative mx-2 inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 py-1 px-2 text-xl font-bold text-gray-200 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <HiLanguage/>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <button
              className="w-full flex px-2 py-2 items-center ui-active:bg-gray-200"
              locale="id"
              onClick={() => router.replace(pathname, {locale: "id"})}>
              <HiLanguage className="mr-2 w-5 h-5" />
              {locale == "id" ? "Bahasa Indonesia": "Indonesien"}
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              className="w-full flex px-2 py-2 items-center ui-active:bg-gray-200"
              locale="fr"
              onClick={() => router.replace(pathname, {locale: "fr"})}>
              <HiLanguage className="mr-2 w-5 h-5" />
              {locale == "id" ? "Bahasa Perancis" : "Francais"}
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
export default function Header({locale}) {
  const t = useTranslations("header")
  const navlink = [
    {label: t("home"), target: "/"},
    {label: t("evaluation"), target: "/evaluation"},
    {label: t("help"), target: "#help"}
  ]

  return (
    <Navbar className="bg-gradient-to-r from-secondary to-primary">
      <Navbar.Brand href="/" className="grow">
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
      <div className="flex items-center md:order-3">
        <LanguageOption locale={locale} />
        <Navbar.Toggle className="text-gray-200 hover:bg-opacity-30 focus:ring-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" />
      </div>
      <Navbar.Collapse>
        {
          navlink.map((link, index) => {
            return (
              <Navbar.Link
                key={index}
                href={link.target}
                className="text-gray-200 w-full hover:text-gray-100 hover:bg-opacity-30 border-b-0 md:border-t-0 border-t-1 font-semibold text-lg"
              >
                {link.label}
              </Navbar.Link>
            )
          })
        }
        <div className="flex order-first md:order-last max-w-full">
          <SearchBox label={t("search")} minimize />
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}
