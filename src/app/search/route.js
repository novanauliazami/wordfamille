import path from 'path'
import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'


export async function GET(request) {
  const searchedWord = request.nextUrl.searchParams.get("word")

  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/word-family.json', 'utf8');
  
  const wordFamilies = JSON.parse(fileContents)

  const foundWord = wordFamilies.filter((wordFamily) => {
    if(wordFamily.word.toLowerCase().startsWith(searchedWord.toLowerCase())) {
      return true
    }
    return false
  }).map((wordFamily) => {
    return {
      word: wordFamily.word,
      url: encodeURI("/word/" + wordFamily.word)
    }
  })
  return NextResponse.json(foundWord.length > 0? foundWord : [])
} 
