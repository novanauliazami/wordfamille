'use client'

import { useTranslations } from "next-intl"

function AboutCard({title, children}) {
  return (
    <div className="w-full lg:max-w-4xl mx-auto relative p-6 my-10 border border-plain rounded-lg shadow">
      <h5 className="absolute px-5 py-0.5 -top-4 left-2 bg-secondary rounded-full border border-plain mb-2 text-md uppercase font-bold tracking-tight">{title}</h5>
      <p>{children}</p>
    </div>
  )
}

function About() {
  const t = useTranslations("about")

  return (
    <main className="container mx-auto">
      <AboutCard title={t("whatis")}>{t("whatis_desc")}</AboutCard>
      <AboutCard title={t("purpose")}>{t("purpose_desc")}</AboutCard>
      <AboutCard title={t("scope")}>{t("scope_desc")}</AboutCard>
    </main>
  )
}

export default About