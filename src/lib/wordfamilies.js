import path from 'path'
import { promises as fs } from 'fs'

export default async function getWordFamilies() {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/word-family.json', 'utf8');
  
  return JSON.parse(fileContents)
}