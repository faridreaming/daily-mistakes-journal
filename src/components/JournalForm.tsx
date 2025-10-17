import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import type { formField } from '@/types/formFields.types'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

type JournalFormProps = {
  isReadOnly?: boolean
  readOnlyFormFields?: formField[]
}

function JournalForm({
  isReadOnly = false,
  readOnlyFormFields = [],
}: JournalFormProps) {
  const formFields: formField[] = [
    {
      name: 'mistakes',
      label: 'Today’s Mistakes',
      description:
        'List each mistake on its own line. Be specific and observable (what exactly happened?)',
    },
    {
      name: 'triggers',
      label: 'Triggers & Root Causes',
      description:
        'What sparked each mistake? Note situation, emotion, cue, people, time, or thought pattern.',
    },
    {
      name: 'effects',
      label: 'Impact on My Day',
      description:
        'How did the mistakes affect mood, time, results, or relationships? Quantify if you can.',
    },
    {
      name: 'three_months',
      label: 'If This Continues for 3 Months…',
      description:
        'Project the consequences if repeated daily—health, grades/work, money, habits, or relationships.',
    },
    {
      name: 'tomorrow_steps',
      label: 'Plan for Tomorrow (Prevention Steps)',
      description:
        'Concrete, tiny actions with timing. Use “if–then” plans and environment tweaks.',
    },
  ]

  const finalFormFields = isReadOnly ? readOnlyFormFields : formFields

  return (
    <FieldSet>
      <FieldGroup>
        {finalFormFields.map((field, index) => (
          <Field key={field.name}>
            <FieldLabel htmlFor={field.name}>
              {index + 1}. {field.label}
            </FieldLabel>
            <FieldDescription>{field.description}</FieldDescription>
            <Textarea
              id={field.name}
              autoComplete="off"
              placeholder="Write here..."
              className={cn(
                'placeholder:text-xs',
                isReadOnly && 'pointer-events-none'
              )}
              value={'value' in field ? field.value : undefined}
              readOnly={isReadOnly}
            />
          </Field>
        ))}
        {!isReadOnly && (
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
          </Field>
        )}
      </FieldGroup>
    </FieldSet>
  )
}

export default JournalForm
