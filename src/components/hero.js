'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

function CTA({href, children}) {
  return (
    <a
      href={href}
      className="bg-secondary border border-plain rounded-full font-semibold uppercase py-2 px-6 lg:shadow-lg hover:shadow-secondary"
    >
      {children}
    </a>
  )
}

function Hero() {
  const t = useTranslations("index")

  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row text-center lg:text-left justify-center">
          <div className="lg:basis-3/5 py-auto space-y-3">
            <h2 className="font-black tracking-wider lg:leading-relaxed text-2xl lg:text-4xl">{t("tagline")}</h2>
            <p>{t("tagline_description")}</p>
            <div><CTA href="#mulai">{t("cta")}</CTA></div>
          </div>
          <div className="lg:basis-2/5 order-first lg:order-last">
            <Image
              className="mx-auto"
              src="/french-logo.png" width={200} height={200}
              alt="French Logo"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;