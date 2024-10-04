export enum QuestionType {
  TEXT = 'text',
  MULTIPLE_CHOICE = 'multiple_choice',
  CHECKBOX = 'checkbox',
}

export interface Question {
  id: number
  text: string
  type: QuestionType
  options: string[]
}