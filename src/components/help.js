'use client'

import { BsInputCursorText } from 'react-icons/bs'
import { TbInputSearch } from 'react-icons/tb'
import { LuWholeWord } from 'react-icons/lu'

function Tutorial() {
  const steps = [
    {
      icon: <BsInputCursorText />,
      title: "Masukan Kata",
      content: "Masukan kata yang ingin Anda cari di kotak pencarian di halaman utama."
    },
    {
      icon: <TbInputSearch />,
      title: "Tekan Icon Pencarian",
      content: `Tekan tombol "cari" atau tekan tombol "Enter" pada keyboard Anda.`
    },
    {
      icon: <LuWholeWord />,
      title: "Hasil Pencarian",
      content: `Hasil pencarian akan ditampilkan dalam beberapa kategori seperti "Keluarga kata bahasa Perancis", "Terjemahan", dan "Jenis Kata."`
    }
  ]

  const ShowStep = ({icon, title, content}) =>{
    return (
      <li className="py-3 sm:py-4 border-t">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 text-xl text-primary">
              {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-md font-medium text-primary">
                {title}
            </p>
            <p className="text-sm">
                {content}
            </p>
          </div>
        </div>
      </li>
    )
  }

  return (
    <div className="flow-root">
      <ul role="list">
        {
          steps.map((step) => {
            return <ShowStep key={step.title} icon={step.icon} title={step.title} content={step.content} />
          })
        }
      </ul>
    </div>
  )
}
export default function Help() {
  
  return (
    <section
      id="help"
      className="max-w-4xl mx-auto my-8 p-4">
      <div className="py-2">
        <hr className="border-t border-gray-200 my-3 max-w-sm mx-auto"></hr>
        <h3 className="text-2xl font-semibold mb-2 text-primary">PETUNJUK PENGGUNAAN</h3>
        <p className="text-sm text-justify">
          Selamat datang di WORDFAMILLE.COM.
          Sebuah website yang dirancang untuk membantu Anda mengeksplorasi 
          dan memperkaya kosakata bahasa Perancis. Dengan menggunakan fitur 
          pencarian kami, Anda dapat dengan mudah menemukan informasi 
          turunan kata, makna, dan jenis kata bahasa Perancis. Berikut adalah 
          petunjuk penggunaan untuk membantu Anda memanfaatkan situs ini
          dengan efektif.
        </p>
      </div>
      <Tutorial />
    </section>
  )
}