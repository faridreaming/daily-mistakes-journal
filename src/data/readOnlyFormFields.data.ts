import type { formField } from '@/types/formFields.types'

export const readOnlyFormFields: formField[] = [
  {
    name: 'mistakes',
    label: 'Today’s Mistakes',
    description:
      'List each mistake on its own line. Be specific and observable (what exactly happened?)',
    value:
      '1. Checked my phone during study time.\n2. Ate junk food late at night.',
  },
  {
    name: 'triggers',
    label: 'Triggers & Root Causes',
    description:
      'What sparked each mistake? Note situation, emotion, cue, people, time, or thought pattern.',
    value:
      "1. Got bored while studying and wanted quick dopamine.\n2. Felt stressed and thought, 'I deserve a snack.'",
  },
  {
    name: 'effects',
    label: 'Impact on My Day',
    description:
      'How did the mistakes affect mood, time, results, or relationships? Quantify if you can.',
    value:
      '1. Lost 45 minutes of focus and felt guilty after scrolling.\n2. Slept late and woke up tired in the morning.',
  },
  {
    name: 'three_months',
    label: 'If This Continues for 3 Months…',
    description:
      'Project the consequences if repeated daily—health, grades/work, money, habits, or relationships.',
    value:
      'My productivity will drop, my sleep cycle will worsen, and I’ll feel stuck in the same loop.',
  },
  {
    name: 'tomorrow_steps',
    label: 'Plan for Tomorrow (Prevention Steps)',
    description:
      'Concrete, tiny actions with timing. Use “if–then” plans and environment tweaks.',
    value:
      'If I feel bored while studying, then I’ll take a 5-minute walk instead of opening my phone.',
  },
]