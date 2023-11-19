'use client'

import reactStringReplace from 'react-string-replace'
import { useTranslations } from 'next-intl'
import { questions } from '@/lib/questions'
import { useState, useEffect, Fragment } from 'react'
import { PieChart, Pie, Cell, Label } from 'recharts'
import { FaRegCircleCheck, FaCircleCheck, FaRegCircle } from 'react-icons/fa6'
import { Accordion } from 'flowbite-react'
import { FaTimesCircle } from 'react-icons/fa'

function VisualizeScore(correctAnswer, nQuestions) {
  const data = [
    {name: "correct", value: correctAnswer},
    {name: "incorrect", value: nQuestions - correctAnswer}
  ]

  return (
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        cx={120}
        cy={200}
        innerRadius={78}
        outerRadius={96}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        <Label value={`${correctAnswer}/${nQuestions}`} position="centerBottom" className="mb-2" fontSize="20px" />
        <Label value="Soal Terjawab" position="centerTop" fontSize="12px"/>
        <Cell fill="#16a34a" />
        <Cell fill="#dc2626" />
      </Pie>
    </PieChart>
  )
}

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function Evaluation() {
  const t = useTranslations("evaluation")
  const maxQuestion = questions.length
  const [done, setDone] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isDialogOpen, setDialogOpen] = useState(false)

  const InstructionList = () => {
    const ins = useTranslations("evaluation.intructions")
    const insList = ["understanding", "answers", "nextStep", "completing", "result"]

    return (
      insList.map((key) => {
        return (
          <li key={key}>
            {ins(key)}
          </li>
        )
      })  
    )
  }

  const InstructionAccordion = () => {
    return (
      <Accordion className="my-5">
        <Accordion.Panel>
          <Accordion.Title>{t("instructionDetail")}</Accordion.Title>
          <Accordion.Content>
            <ul role="list" className="list-decimal ml-4 space-4">
              <InstructionList />
            </ul>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    )
  }

  const handleOptions = (e) => {
    const ans = e.target.value
    setAnswers([
      ...answers,
      ans
    ])

    setCurrentQuestion(currentQuestion + 1)
  }

  const ShowOptions = (match, i) => {
    return (
      <form className="inline-block">
        <select
          onChange={handleOptions}
          className="bg-inherit border-b border-gray-200 text-sm rounded-md focus:ring-accent"
          value=""
        >
          <option value="" selected disabled hidden>{t("answer")}</option>
          {
            questions[currentQuestion].options.map((opt, index) => {
              return <option key={index} value={index}>{opt}</option>
            })
          }
        </select>
      </form>
    )
  }

  const ShowQuestion = () => {
    return (
      <div className="py-5">
        {reactStringReplace(questions[currentQuestion].question, "%s", ShowOptions)}
      </div>
    )
  }

  const ShowScore = () => {
    const correctAnswer = answers.reduce((accumulator, ans, index) => {
      return accumulator + ((ans == questions[index].correctAns) ? 1 : 0)
    }, 0)
    return VisualizeScore(correctAnswer, answers.length)
  }

  const ShowCorrection = () => {
    return (
      <>
        <div className="mx-auto">
          <ShowScore />
        </div>
        <ul role="list" className="divide-y divide-gray-200 space-y-4">
          {answers.map((ans, index) => {
            const question = questions[index]
            return (
              <li className="py-2" key={index}>
                {reactStringReplace(question.question, "%s", (match, i) => {
                  return "______"
                })}
                <div className="flex flex-wrap items-center py-2 justify-between space-y-2">
                  {
                    question.options.map((option, index) => {
                      const isCorrect = (ans == question.correctAns)
                      if (index == question.correctAns) {
                        return (
                          <span key={index} className={`option-button border-green-500 ${isCorrect ? "bg-green-200 " : "bg-green-100"}`}>
                            {option} {isCorrect ? <FaCircleCheck className="ml-auto lg:ml-2 text-green-700"/> : <FaRegCircleCheck className="ml-auto text-green-700"/>}
                          </span>
                        )
                      }
                      if (index == ans) {
                        return (
                          <span key={index} className="option-button bg-red-100 border-red-300">
                            {option} <FaTimesCircle className="ml-auto lg:ml-2 text-red-500"/>
                          </span>
                        )
                      }
                      return (
                        <span key={index} className="option-button">
                            {option} <FaRegCircle className="ml-auto lg:ml-2"/>
                        </span>
                      )
                      })
                      
                  }
                </div>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  const handleRetryButton = () => {
    if (done) {
      setAnswers([])
      setCurrentQuestion(0)
      shuffleArray(questions)
    }
    setDone(!done)
  }
  useEffect(() => {
    if (!(currentQuestion < maxQuestion))
      setDone(true)
  }, [currentQuestion])

  return (
    <div className="container lg:max-w-4xl mx-auto my-8">
      <div className="py-2">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2 text-primary">
            {t("title")}
          </h3>
        </div>
        <p className="text-md text-justify">
          {t("desc")}
        </p>
        <InstructionAccordion />
      </div>
      <div className="mb-4 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between my-1">
          <h5 className="text-md font-bold">
            {t("question")}#{currentQuestion < maxQuestion ? currentQuestion+1 : maxQuestion}
          </h5>
          <button
            onClick={handleRetryButton}
            className="text-sm font-bold border text-gray-200 bg-primary px-3 py-1 rounded-md hover:bg-blue-700">
            {done ? t("retry") : t("done")}
          </button>
        </div>
        <p className="text-md md:max-w-[70%]">
          {t("instructions")}
        </p>
      </div>
      {!done ? <ShowQuestion /> : <ShowCorrection />}
    </div>
  )
}

export default Evaluation