import getWordFamilies from "@/lib/wordfamilies";
import { NextResponse } from "next/server";

const wordFamilies = await getWordFamilies()

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("q")

  if(!query) {
    return NextResponse.json({
        message: "Query Empty"
      }, {
        status: 400,
    })
  }

  const result = wordFamilies.find((wordFamily) => {
    const loweredQuery = query.toLowerCase()
    if (wordFamily.word.toLowerCase() === loweredQuery)
      return true

    return !!wordFamily.family.find((family) => {
      return family.word.toLowerCase() == loweredQuery
    })
  })

  if(result)
    return NextResponse.json(result)

  return NextResponse.json({
    message: "Word Not Found"
  }, {
    status: 404,
  })
}
