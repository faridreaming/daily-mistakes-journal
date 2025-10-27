import { Calendar } from '@/components/ui/calendar'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { formFields } from '@/data/formFields.data'
import type { FormValues } from '@/hooks/useJournalForm'
import { useJournalForm } from '@/hooks/useJournalForm'
import { cn } from '@/lib/utils'
import type { FormField } from '@/types/formFields.types'
import type { JournalFormProps } from '@/types/journalFormProps.types'
import { format } from 'date-fns'
import { BookPlusIcon, CalendarIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { Button } from './ui/button'

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
                  {currentField?.description && (
                    <FieldDescription>
                      {currentField.description}
                    </FieldDescription>
                  )}
                  {currentField?.type === 'textarea' ? (
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
                          : (formField.value as string) || ''
                      }
                      onChange={formField.onChange}
                      onBlur={formField.onBlur}
                      tabIndex={isReadOnly ? -1 : 0}
                      readOnly={isReadOnly}
                    />
                  ) : (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!formField.value}
                          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formField.value ? (
                            format(
                              isReadOnly &&
                                currentField &&
                                'value' in currentField
                                ? new Date(currentField.value)
                                : (formField.value as Date),
                              'PPP'
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={
                            isReadOnly &&
                            currentField &&
                            'value' in currentField
                              ? new Date(currentField.value)
                              : (formField.value as Date | undefined)
                          }
                          onSelect={isReadOnly ? undefined : formField.onChange}
                          disabled={isReadOnly}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
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
