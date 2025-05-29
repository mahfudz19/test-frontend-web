import { FC, HTMLAttributes, ReactNode, createContext, forwardRef, useContext, useState } from 'react'

interface AccordionContextProps {
  openValues: Set<string>
  toggleValue: (value: string) => void
  type: 'single' | 'multiple'
}

const AccordionContext = createContext<AccordionContextProps | undefined>(undefined)

export const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) throw new Error('useAccordionContext must be used within an AccordionProvider')
  return context
}

interface AccordionProviderProps {
  children: ReactNode
  type?: 'single' | 'multiple'
}

const AccordionProvider: FC<AccordionProviderProps> = ({ children, type = 'multiple' }) => {
  const [openValues, setOpenValues] = useState<Set<string>>(new Set())

  const toggleValue = (value: string) => {
    setOpenValues(prev => {
      const newValues = new Set(prev)
      if (type === 'single') {
        if (newValues.has(value)) {
          newValues.clear()
        } else {
          newValues.clear()
          newValues.add(value)
        }
      } else {
        if (newValues.has(value)) newValues.delete(value)
        else newValues.add(value)
      }
      return newValues
    })
  }

  return <AccordionContext.Provider value={{ openValues, toggleValue, type }}>{children}</AccordionContext.Provider>
}

interface MoreProps {
  children: ReactNode
  type?: 'single' | 'multiple'
}

export type AccordionProps = HTMLAttributes<HTMLDivElement> & MoreProps

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, type = 'multiple', ...props }: AccordionProps, ref) => {
    return (
      <AccordionProvider type={type}>
        <div {...props} ref={ref}>
          {children}
        </div>
      </AccordionProvider>
    )
  }
)

Accordion.displayName = 'Accordion'

export default Accordion
