'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="m-6">
      <hr className="my-6 border-grey-400 mx-auto lg:my-8" />
      <span className="block text-sm text-plain sm:text-center">
        © 2023 <Link href="/" className="hover:underline">WordFamille</Link>. All Rights Reserved.
        </span>
    </footer>
  )
}