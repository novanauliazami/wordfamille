import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

function Menu({target, img, children}) {
  return (
    <Link href={target}>
      <div className="lg:max-w-xl flex items-center mx-auto bg-gradient-to-r from-secondary from-60% to-accent to-100% rounded-lg px-4 h-24 border-2 border-plain ">
          <h2 className="text-plain text-xl w-1/2 hover:underline font-semibold uppercase">
            {children}
          </h2>
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