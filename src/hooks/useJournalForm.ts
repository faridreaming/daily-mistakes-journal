import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
  mistakes: z.string().trim().nonempty('Mistakes are required'),
  triggers: z.string().trim().nonempty('Triggers are required'),
  effects: z.string().trim().nonempty('Effects are required'),
  three_months: z.string().trim().nonempty('Three months are required'),
  tomorrow_steps: z.string().trim().nonempty('Tomorrow steps are required'),
})

export type FormValues = z.infer<typeof formSchema>

export function useJournalForm() {
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
    console.log(data)
  }

  const handleSubmit = form.handleSubmit(onSubmit)

  return {
    form,
    onSubmit: handleSubmit,
    isSubmitting: form.formState.isSubmitting,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
  }
}
