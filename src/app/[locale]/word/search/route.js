import getWordFamilies from '@/lib/wordfamilies'
import Fuse from 'fuse.js'
import { NextResponse } from 'next/server'

const options = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.2,
  keys: [
    'word',
    'family.word',
    'family.meaning'
  ]
}


const wordFamilies = await getWordFamilies()

const fuse = new Fuse(wordFamilies, options)

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("q")
  if(!query)
    return NextResponse.json([])

  const result = fuse.search(query)

  return NextResponse.json(result)
}