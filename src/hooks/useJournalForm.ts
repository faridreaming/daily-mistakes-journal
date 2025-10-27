import { useForm } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { nanoid } from 'nanoid/non-secure'
import { useEffect, useCallback, useRef } from 'react'
import type { JournalData } from '@/types/journalData.types'

const formSchema = z.object({
  date: z.date(),
  mistakes: z.string().trim().nonempty('Mistakes are required'),
  triggers: z.string().trim().nonempty('Triggers are required'),
  effects: z.string().trim().nonempty('Effects are required'),
  three_months: z.string().trim().nonempty('Three months are required'),
  tomorrow_steps: z.string().trim().nonempty('Tomorrow steps are required'),
})

export type FormValues = z.infer<typeof formSchema>

// Constants for localStorage
const AUTO_SAVE_KEY = 'journal-form-draft'
const JOURNAL_DATA_KEY = 'journal-entries'
const AUTO_SAVE_DEBOUNCE_MS = 0
const MIN_CHARACTERS_FOR_SAVE = 1

export function useJournalForm(externalForm?: UseFormReturn<FormValues>, isReadOnly?: boolean) {
  const debounceTimeoutRef = useRef<number | null>(null)
  const isRestoringRef = useRef(false)

  // Function to restore data from localStorage
  const restoreFromLocalStorage = useCallback((): FormValues | null => {
    try {
      const savedData = localStorage.getItem(AUTO_SAVE_KEY)
      if (savedData) {
        const parsed = JSON.parse(savedData)
        // Validate the restored data structure
        if (parsed && typeof parsed === 'object') {
          return {
            date: parsed.date || new Date(),
            mistakes: parsed.mistakes || '',
            triggers: parsed.triggers || '',
            effects: parsed.effects || '',
            three_months: parsed.three_months || '',
            tomorrow_steps: parsed.tomorrow_steps || '',
          }
        }
      }
    } catch (error) {
      console.warn('Failed to restore form data from localStorage:', error)
    }
    return null
  }, [])

  // Function to save data to localStorage
  const saveToLocalStorage = useCallback((data: FormValues) => {
    try {
      // Only save if there's meaningful content (at least 3 characters in any field)
      const hasContent = Object.values(data).some(value =>
        typeof value === 'string' && value.trim().length >= MIN_CHARACTERS_FOR_SAVE
      )

      if (hasContent) {
        localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(data))
      } else {
        // Clear localStorage if no meaningful content
        localStorage.removeItem(AUTO_SAVE_KEY)
      }
    } catch (error) {
      console.warn('Failed to save form data to localStorage:', error)
    }
  }, [])

  // Function to save journal data to localStorage
  const saveJournalData = useCallback((journalData: JournalData) => {
    try {
      const existingData = localStorage.getItem(JOURNAL_DATA_KEY)
      const journalEntries: JournalData[] = existingData ? JSON.parse(existingData) : []

      // Add new entry to the beginning of the array
      journalEntries.unshift(journalData)

      // Keep only the last 100 entries to prevent localStorage from getting too large
      const trimmedEntries = journalEntries.slice(0, 100)

      localStorage.setItem(JOURNAL_DATA_KEY, JSON.stringify(trimmedEntries))
      console.log('Journal data saved to localStorage:', journalData)
    } catch (error) {
      console.warn('Failed to save journal data to localStorage:', error)
    }
  }, [])

  // Function to load journal data from localStorage
  const loadJournalData = useCallback((): JournalData[] => {
    try {
      const savedData = localStorage.getItem(JOURNAL_DATA_KEY)
      if (savedData) {
        const parsed = JSON.parse(savedData)
        if (Array.isArray(parsed)) {
          // Convert string dates back to Date objects
          return parsed.map(entry => ({
            ...entry,
            createdAt: new Date(entry.createdAt),
            updatedAt: new Date(entry.updatedAt),
            data: {
              ...entry.data,
              date: new Date(entry.data.date)
            }
          }))
        }
      }
    } catch (error) {
      console.warn('Failed to load journal data from localStorage:', error)
    }
    return []
  }, [])

  // Debounced auto-save function
  const debouncedSave = useCallback((data: FormValues) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      saveToLocalStorage(data)
    }, AUTO_SAVE_DEBOUNCE_MS)
  }, [saveToLocalStorage])

  // Restore data from localStorage on mount
  const restoredData = restoreFromLocalStorage()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: restoredData || {
      date: new Date(),
      mistakes: '',
      triggers: '',
      effects: '',
      three_months: '',
      tomorrow_steps: '',
    },
  })

  // Watch form changes for auto-save
  const watchedValues = (externalForm || form).watch()

  // Auto-save effect
  useEffect(() => {
    // Don't auto-save during restoration or if form is not ready
    if (isRestoringRef.current || !watchedValues) return

    // Don't auto-save in read-only mode
    if (isReadOnly) return

    debouncedSave(watchedValues)
  }, [watchedValues, debouncedSave, isReadOnly])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [])

  const onSubmit = (data: FormValues) => {
    // Clear the draft from localStorage on successful submit
    try {
      localStorage.removeItem(AUTO_SAVE_KEY)
    } catch (error) {
      console.warn('Failed to clear draft from localStorage:', error)
    }

    const journalData: JournalData = {
      id: nanoid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      data: data,
    }

    // Save journal data to localStorage
    saveJournalData(journalData)
    console.log('Journal data saved:', journalData)

    // Reset form after successful submission
    const currentForm = externalForm || form
    currentForm.reset({
      date: new Date(),
      mistakes: '',
      triggers: '',
      effects: '',
      three_months: '',
      tomorrow_steps: '',
    })
  }

  const handleSubmit = (externalForm || form).handleSubmit(onSubmit)

  // Function to manually clear the draft
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(AUTO_SAVE_KEY)
    } catch (error) {
      console.warn('Failed to clear draft from localStorage:', error)
    }
  }, [])

  // Function to check if there's a saved draft
  const hasDraft = useCallback(() => {
    try {
      return localStorage.getItem(AUTO_SAVE_KEY) !== null
    } catch {
      return false
    }
  }, [])

  // Function to delete a specific journal entry
  const deleteJournalEntry = useCallback((id: string) => {
    try {
      const existingData = localStorage.getItem(JOURNAL_DATA_KEY)
      if (existingData) {
        const journalEntries: JournalData[] = JSON.parse(existingData)
        const filteredEntries = journalEntries.filter(entry => entry.id !== id)
        localStorage.setItem(JOURNAL_DATA_KEY, JSON.stringify(filteredEntries))
        console.log('Journal entry deleted:', id)
      }
    } catch (error) {
      console.warn('Failed to delete journal entry from localStorage:', error)
    }
  }, [])

  // Function to clear all journal data
  const clearAllJournalData = useCallback(() => {
    try {
      localStorage.removeItem(JOURNAL_DATA_KEY)
      console.log('All journal data cleared')
    } catch (error) {
      console.warn('Failed to clear all journal data from localStorage:', error)
    }
  }, [])

  return {
    form: externalForm || form,
    onSubmit: handleSubmit,
    isSubmitting: (externalForm || form).formState.isSubmitting,
    isValid: (externalForm || form).formState.isValid,
    errors: (externalForm || form).formState.errors,
    clearDraft,
    hasDraft,
    loadJournalData,
    saveJournalData,
    deleteJournalEntry,
    clearAllJournalData,
  }
}
