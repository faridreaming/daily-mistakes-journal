import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import type { FormField } from '@/types/formFields.types'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { BookPlusIcon } from 'lucide-react'
import { formFields } from '@/data/formFields.data'
import { Controller } from 'react-hook-form'
import { useJournalForm } from '@/hooks/useJournalForm'
import type { JournalFormProps } from '@/types/journalFormProps.types'
import type { FormValues } from '@/hooks/useJournalForm'

function JournalForm({
  isReadOnly = false,
  readOnlyFormFields = [],
  externalForm,
}: JournalFormProps) {
  const finalFormFields: FormField[] = isReadOnly
    ? readOnlyFormFields
    : formFields

  const { form, onSubmit, isSubmitting } = useJournalForm(
    externalForm,
    isReadOnly
  )

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup>
        {finalFormFields.map((field, index) => (
          <Controller
            name={field.name as keyof FormValues}
            key={field.name}
            control={form.control}
            render={({ field: formField, fieldState }) => {
              const currentField: FormField | undefined = finalFormFields.find(
                (f) => f.name === formField.name
              )
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={formField.name}>
                    {index + 1}. {currentField?.label}
                  </FieldLabel>
                  <FieldDescription>
                    {currentField?.description}
                  </FieldDescription>
                  <Textarea
                    id={formField.name}
                    autoComplete="off"
                    placeholder="Write here..."
                    aria-invalid={fieldState.invalid}
                    className={cn(
                      'placeholder:text-xs',
                      isReadOnly && 'pointer-events-none'
                    )}
                    value={
                      isReadOnly && currentField && 'value' in currentField
                        ? currentField.value
                        : formField.value || ''
                    }
                    onChange={formField.onChange}
                    onBlur={formField.onBlur}
                    tabIndex={isReadOnly ? -1 : 0}
                    readOnly={isReadOnly}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )
            }}
          />
        ))}
        {!isReadOnly && (
          <Field orientation="horizontal">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              <BookPlusIcon className="size-4" /> Add New Entry
            </Button>
          </Field>
        )}
      </FieldGroup>
    </form>
  )
}

export default JournalForm
