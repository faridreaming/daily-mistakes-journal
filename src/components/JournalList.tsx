import { useState, useEffect } from 'react'
import { useJournalForm, type FormValues } from '../hooks/useJournalForm'
import type { JournalData } from '@/types/journalData.types'
import { formFields } from '@/data/formFields.data'

function JournalList() {
  const { loadJournalData } = useJournalForm()
  const [journalEntries, setJournalEntries] = useState<JournalData[]>([])

  // Load journal entries from localStorage on component mount
  useEffect(() => {
    const entries = loadJournalData()
    setJournalEntries(entries)
  }, [loadJournalData])

  console.log(journalEntries)
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Journal List</h2>
      {journalEntries.map((entry) => (
        <div key={entry.id} className="border p-4 mb-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">
            {entry.createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </h3>
          <div className="space-y-2">
            {formFields.map((field) => (
              <div key={field.name}>
                <h4 className="font-semibold">{field.label}</h4>
                <p className="text-gray-500 mb-4 whitespace-pre-wrap text-sm">
                  {entry.data[field.name as keyof FormValues]}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="text-gray-600 mb-4">
        Total entries: {journalEntries.length}
      </p>
    </div>
  )
}

export default JournalList
