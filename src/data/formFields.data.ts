import type { FormField } from '@/types/formFields.types'

export const formFields: FormField[] = [
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