'use client'

import reactStringReplace from 'react-string-replace'
import { questions } from '@/lib/questions'
import { useState } from 'react'

function ShowQuestions() {
  const [currentQuestion, setcurrentQuestion] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const maxQuestion = questions.length
  

  const handleOptions = (e) => {
    const ans = e.target.value
    if(ans == questions[currentQuestion].correctAns) {
      setCorrectAnswer(correctAnswer + 1)
    }
    setcurrentQuestion(currentQuestion + 1)
  }

  const ShowOptions = (match, i) => {
    return (
      <form className="inline-block">
        <select
          onChange={handleOptions}
          className="bg-inherit border-none border-b border-gray-200 text-sm rounded-md focus:ring-accent"
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

  const Retry = () => {
    return (
      <div className="flex flex-col py-4 px-2 items-center justify-content-center space-y-2">
        <p>Anda mendapatkan skor <span className="font-bold">{correctAnswer}/{maxQuestion}</span></p>
        <button
          onClick={(e) => {
            setCorrectAnswer(0)
            setcurrentQuestion(0)
          }}
          className="border border-accent bg-inherit px-3 py-1 rounded-md"
        >
          Coba Lagi?
          </button>
      </div>
    )
  }

  return (
    <div className="w-full p-4 bg-base border border-gray-200 rounded-lg shadow-sm sm:p-8">
      <div className="flex items-center justify-between mb-4 py-4 border-b border-gray-200 text-md font-bold">
        <h5 className="leading-none">
          Pertanyaan#{currentQuestion+1}
        </h5>
        <span>
            <span className="text-green-500">{correctAnswer}</span>/{maxQuestion}
        </span>
      </div>
      <div className="py-2">
        { currentQuestion < maxQuestion && reactStringReplace(questions[currentQuestion].question, "%s", ShowOptions) }
        { currentQuestion >= maxQuestion && <Retry />}
      </div>
    </div>
  )
}

function Evaluation() {
  return (
    <div className="max-w-4xl mx-auto px-2 my-8">
      <ShowQuestions />
    </div>
  )
}

export default Evaluation