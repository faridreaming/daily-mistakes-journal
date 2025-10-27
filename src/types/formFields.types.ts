export type FormField =
  {
    type: 'textarea' | 'date'
    name: string
    label: string
    description: string | undefined
  }
  | {
    type: 'textarea' | 'date'
    name: string
    label: string
    description: string | undefined
    value: string
  }