import React, { useState } from 'react'
import { Question } from '../types'
import QuestionForm from './QuestionForm'
import { Edit, Trash2 } from 'lucide-react'

interface QuestionListProps {
  questions: Question[]
  onUpdate: (question: Question) => void
  onDelete: (id: number) => void
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
          {editingId === question.id ? (
            <QuestionForm
              initialQuestion={question}
              onSubmit={(updatedQuestion) => {
                onUpdate(updatedQuestion)
                setEditingId(null)
              }}
            />
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-2">{question.text}</h3>
              <p className="text-gray-600 mb-2">Type: {question.type}</p>
              {question.options && question.options.length > 0 && (
                <ul className="list-disc list-inside mb-4">
                  {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingId(question.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                >
                  <Edit size={16} className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => onDelete(question.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
                >
                  <Trash2 size={16} className="mr-1" /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default QuestionList