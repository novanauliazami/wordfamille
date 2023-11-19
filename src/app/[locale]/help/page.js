'use client'

import { useTranslations } from 'next-intl'
import { BsInputCursorText } from 'react-icons/bs'
import { TbInputSearch } from 'react-icons/tb'
import { LuWholeWord } from 'react-icons/lu'

export default function Help() {
  const t = useTranslations("help")
  const steps = [
    {
      icon: <BsInputCursorText />,
      title: t("step1"),
      detail: t("step1Detail")
    },
    {
      icon: <TbInputSearch />,
      title: t("step2"),
      detail: t("step2Detail")
    },
    {
      icon: <LuWholeWord />,
      title: t("step3"),
      detail: t("step3Detail")
    }
  ]

  const ShowStep = ({step}) =>{
    return (
      <li className="py-3 sm:py-4 border-t">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 text-xl text-accent">
              {step.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-md font-medium text-accent">
                {step.title}
            </p>
            <p className="text-sm">
                {step.detail}
            </p>
          </div>
        </div>
      </li>
    )
  }

  return (
    <main
      className="container lg:max-w-4xl mx-auto my-8 p-4">
      <div className="py-2">
        <h3 className="text-xl font-semibold mb-2 text-center text-accent uppercase">{t("title")}</h3>
        <p className="text-sm text-justify">
          {t("subtitle")}
        </p>
      </div>
      <div className="flow-root">
        <ul role="list">
          {
            steps.map((step) => {
              return <ShowStep key={step.title} step={step} />
            })
          }
        </ul>
      </div>
    </main>
  )
}