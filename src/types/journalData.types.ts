import type { FormValues } from "@/hooks/useJournalForm"

export type JournalData = {
  id: string
  createdAt: Date
  updatedAt: Date
  data: FormValues
}