import { useForm } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { nanoid } from 'nanoid/non-secure'

const formSchema = z.object({
  mistakes: z.string().trim().nonempty('Mistakes are required'),
  triggers: z.string().trim().nonempty('Triggers are required'),
  effects: z.string().trim().nonempty('Effects are required'),
  three_months: z.string().trim().nonempty('Three months are required'),
  tomorrow_steps: z.string().trim().nonempty('Tomorrow steps are required'),
})

export type FormValues = z.infer<typeof formSchema>

type JournalData = {
  id: string
  createdAt: string
  updatedAt: string
  data: FormValues
}

export function useJournalForm(externalForm?: UseFormReturn<FormValues>) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mistakes: '',
      triggers: '',
      effects: '',
      three_months: '',
      tomorrow_steps: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    const journalData: JournalData = {
      id: nanoid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: data,
    }
    console.log(journalData)
  }

  const handleSubmit = (externalForm || form).handleSubmit(onSubmit)

  return {
    form: externalForm || form,
    onSubmit: handleSubmit,
    isSubmitting: (externalForm || form).formState.isSubmitting,
    isValid: (externalForm || form).formState.isValid,
    errors: (externalForm || form).formState.errors,
  }
}
