import React, { useState } from 'react'
import QuestionForm from './components/QuestionForm'
import QuestionList from './components/QuestionList'
import { Question } from './types'
import { PlusCircle } from 'lucide-react'

function App() {
  const [questions, setQuestions] = useState<Question[]>([])

  const addQuestion = (question: Question) => {
    setQuestions([...questions, { ...question, id: Date.now() }])
  }

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q))
  }

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Questionnaire Builder</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <PlusCircle className="mr-2" />
            Add New Question
          </h2>
          <QuestionForm onSubmit={addQuestion} />
        </div>
        <QuestionList
          questions={questions}
          onUpdate={updateQuestion}
          onDelete={deleteQuestion}
        />
      </div>
    </div>
  )
}

export default App