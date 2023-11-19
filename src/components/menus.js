import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

function Menu({target, img, children}) {
  return (
    <Link href={target}>
      <div className="relative lg:max-w-xl mx-auto rounded-md border-2 border-plain">
        <Image className="h-32 w-full object-cover rounded-md grayscale" src={img} width={240} height={320} alt={children} />
        <div className="absolute inset-0 bg-secondary bg-opacity-20 rounded-md"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary from-50% to-transparent to-80% rounded-md"></div>
        <div className="absolute inset-0 w-1/2 left-4 flex items-center">
            <h2 className="text-plain text-xl hover:underline font-semibold uppercase">{children}</h2>
        </div>
      </div>
    </Link>
  )
}

function Menus() {
  const t = useTranslations("index")

  const menuList = [
    {label: t("findWord"), link: "/word", img: "/find-word.jpg"},
    {label: t("evaluation"), link: "/evaluation", img: "/test.jpg"},
    {label: t("aboutUs"), link: "/about", img: "/team.jpg"},
    {label: t("instructions"), link: "help", img: "/instruction.jpg"}
  ]

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
      {
        menuList.map((menu, index) => {
          return (
            <Menu key={index} target={menu.link} img={menu.img}>
              {menu.label}
            </Menu>
          )
        })
      }
    </div>
  )
}

export default Menus