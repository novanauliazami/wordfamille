'use client'

import reactStringReplace from 'react-string-replace'
import { questions } from '@/lib/questions'
import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Label } from 'recharts';
import { FaRegCircleCheck, FaCircleCheck, FaRegCircle } from 'react-icons/fa6';
import { FaTimesCircle } from 'react-icons/fa';

export const metadata = {
  title: 'Evaluasi - Wordfamille',
}

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
  const maxQuestion = questions.length
  const [done, setDone] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])

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
          <option value="" selected disabled hidden>Jawab</option>
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
    <div className="container my-8">
      <div className="w-full p-2 bg-base border border-gray-200 rounded-lg shadow-sm sm:p-8">
        <div className="flex items-center justify-between mb-4 py-2 border-b border-gray-200 text-md font-bold">
          <h5 className="leading-none">
            Evaluasi#{currentQuestion < maxQuestion ? currentQuestion+1 : maxQuestion}
          </h5>
          <button onClick={handleRetryButton} className="text-sm border text-gray-200 bg-primary px-3 py-1 rounded-md hover:bg-blue-700">
            {done ? "Ulangi" : "Selesai"}
          </button>
        </div>
        {!done ? <ShowQuestion /> : <ShowCorrection />}
      </div>
    </div>
  )
}

export default Evaluation