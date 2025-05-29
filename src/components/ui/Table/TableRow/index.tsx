import { HTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface MoreProps {
  hover?: boolean
  evenOdd?: true | 'reverse'
}

export type TableProps = HTMLAttributes<HTMLTableRowElement> & MoreProps

const TableRow = forwardRef<HTMLTableRowElement, TableProps>(({ className, evenOdd, hover, ...rest }, ref) => {
  return (
    <tr
      ref={ref}
      className={twMerge(
        'table-row align-middle outline-0 border-inherit',
        evenOdd === true && 'even:bg-background-paper odd:bg-gray-100 dark:odd:bg-gray-900/80 dark:even:bg-gray-900/5',
        evenOdd === 'reverse' &&
          'odd:bg-background-paper even:bg-gray-100 dark:even:bg-gray-900/80 dark:odd:bg-gray-900/5',
        hover && 'hover:bg-gray-200 dark:hover:bg-gray-500',
        className
      )}
      {...rest}
    />
  )
})

TableRow.displayName = 'TableRow'

export default TableRow
