import React, { useState } from 'react'
import { Question, QuestionType } from '../types'

interface QuestionFormProps {
  onSubmit: (question: Question) => void
  initialQuestion?: Question
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit, initialQuestion }) => {
  const [question, setQuestion] = useState<Question>(
    initialQuestion || { id: 0, text: '', type: QuestionType.TEXT, options: [] }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(question)
    if (!initialQuestion) {
      setQuestion({ id: 0, text: '', type: QuestionType.TEXT, options: [] })
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...question.options]
    newOptions[index] = value
    setQuestion({ ...question, options: newOptions })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="questionText" className="block mb-1 font-medium">
          Question Text
        </label>
        <input
          type="text"
          id="questionText"
          value={question.text}
          onChange={(e) => setQuestion({ ...question, text: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="questionType" className="block mb-1 font-medium">
          Question Type
        </label>
        <select
          id="questionType"
          value={question.type}
          onChange={(e) => setQuestion({ ...question, type: e.target.value as QuestionType })}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value={QuestionType.TEXT}>Text</option>
          <option value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</option>
          <option value={QuestionType.CHECKBOX}>Checkbox</option>
        </select>
      </div>
      {(question.type === QuestionType.MULTIPLE_CHOICE || question.type === QuestionType.CHECKBOX) && (
        <div>
          <label className="block mb-1 font-medium">Options</label>
          {question.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-2"
              placeholder={`Option ${index + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={() => setQuestion({ ...question, options: [...question.options, ''] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Option
          </button>
        </div>
      )}
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        {initialQuestion ? 'Update Question' : 'Add Question'}
      </button>
    </form>
  )
}

export default QuestionForm