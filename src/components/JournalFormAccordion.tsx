import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PlusIcon } from 'lucide-react'
import JournalForm from '@/components/JournalForm'

function JournalFormAccordion() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="cursor-pointer">
          <div className="flex items-center gap-2">
            <PlusIcon className="size-4" />
            Add a new journal entry
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <JournalForm />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default JournalFormAccordion
