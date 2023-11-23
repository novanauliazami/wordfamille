'use client'

import { useTranslations } from "next-intl"

function AboutCard({title, content}) {
  const t = useTranslations("about")

  return (
    <div className="relative px-4 py-6 my-10 border border-plain rounded-lg shadow">
      <h5 className="absolute px-5 py-0.5 -top-4 left-3 bg-secondary rounded-full border border-plain mb-2 text-md uppercase font-bold tracking-tight">
        {t(title)}
      </h5>
      <p className="text-justify">
        {
          t.rich(content, {
            i: (chunks) => <i>{chunks}</i>
          })
        }
      </p>
    </div>
  )
}

function About() {
  return (
    <main className="max-w-[90%] lg:max-w-4xl mx-auto">
      <AboutCard title="whatis" content="whatis_desc" />
      <AboutCard title="purpose" content="purpose_desc" />
      <AboutCard title="scope" content="scope_desc" />
    </main>
  )
}

export default About
