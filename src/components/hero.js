'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

function CTA({href, children}) {
  return (
    <a
      href={href}
      className="bg-secondary border border-plain rounded-full font-semibold uppercase py-2 px-6 my-2 lg:shadow-lg hover:shadow-secondary"
    >
      {children}
    </a>
  )
}

function Hero() {
  const t = useTranslations("index")

  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="lg:max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row text-center lg:text-left items-center justify-center">
          <div className="lg:basis-4/5 py-auto space-y-3">
            <h2 className="font-black tracking-wider text-2xl lg:text-5xl">{t("tagline")}</h2>
            <p className="lg:max-w-[75%]">{t("tagline_description")}</p>
            <div><CTA href="/word">{t("cta")}</CTA></div>
          </div>
          <div className="lg:basis-1/5 order-first lg:order-last">
            <Image
              className="mx-auto max-w-[50%] lg:max-w-full"
              src="/french-logo.png" width={240} height={240}
              alt="French Logo"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;