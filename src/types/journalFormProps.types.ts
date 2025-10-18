import type { FormField } from "./formFields.types"
import type { UseFormReturn } from 'react-hook-form'
import type { FormValues } from '@/hooks/useJournalForm'

export type JournalFormProps = {
  isReadOnly?: boolean
  readOnlyFormFields?: FormField[]
  externalForm?: UseFormReturn<FormValues>
}