import JournalFormAccordion from '@/components/JournalFormAccordion'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from './components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import JournalForm from '@/components/JournalForm'
import { readOnlyFormFields } from '@/data/readOnlyFormFields.data'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { BookOpenIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

function App() {
  return (
    <div className="max-w-xl mx-auto m-4">
      {/* App title */}
      <h1 className="text-2xl font-bold text-center mb-4">
        Daily Mistakes Journal 🥺
      </h1>
      <Alert variant="default" className="mb-4">
        <AlertDescription>
          {/* App description */}
          <p>
            Every night before you go to bed, take a few quiet minutes to open
            your Mistakes Journal and gently reflect on your day.
          </p>
          <p>
            This is not about blaming yourself. It is about understanding your
            patterns, what led to them, and how you can respond better next
            time.
          </p>
          <p>
            By doing this consistently for the next <b>30 days</b>, you will
            start to notice small shifts in your awareness, recognize your
            triggers with kindness, and discover practical ways to grow into the
            person you want to become.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="cursor-pointer mt-2">
                <BookOpenIcon className="size-4" /> See Example
              </Button>
            </DialogTrigger>
            <DialogContent
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="sm:max-w-xl"
            >
              <ScrollArea className="max-h-[90vh] pr-2">
                <VisuallyHidden>
                  <DialogHeader>
                    <DialogTitle>Example</DialogTitle>
                    <DialogDescription>
                      This is an example of the mistakes journal.
                    </DialogDescription>
                  </DialogHeader>
                </VisuallyHidden>
                <JournalForm
                  isReadOnly={true}
                  readOnlyFormFields={readOnlyFormFields}
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </AlertDescription>
      </Alert>

      <JournalFormAccordion />
    </div>
  )
}

export default App
