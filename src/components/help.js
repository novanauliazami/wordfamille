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
          <div className="flex-shrink-0 text-xl text-primary">
              {step.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-md font-medium text-primary">
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
    <section
      id="help"
      className="container lg:max-w-4xl mx-auto my-8 p-4">
      <div className="py-2">
        <hr className="border-t border-gray-200 my-3 max-w-sm mx-auto"></hr>
        <h3 className="text-2xl font-semibold mb-2 text-primary uppercase">{t("title")}</h3>
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
    </section>
  )
}