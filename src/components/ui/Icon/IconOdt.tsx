import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconOdt = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
  const { className, color, fontSize = 24, ...rest } = props
  return (
    <svg
      {...rest}
      ref={ref}
      className={twMerge(variantsIcon({ color, className }))}
      width={`${fontSize}`}
      height={`${fontSize}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        d='M6 15h2q.425 0 .713-.288T9 14v-4q0-.425-.288-.712T8 9H6q-.425 0-.712.288T5 10v4q0 .425.288.713T6 15m.5-1.5v-3h1v3zM10 15h3q.425 0 .713-.288T14 14v-4q0-.425-.288-.712T13 9h-3zm1.5-1.5v-3h1v3zm4.75 1.5h1.5v-4.5H19V9h-4v1.5h1.25zM4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm0-2h16V6H4zm0 0V6z'
      />
    </svg>
  )
})

IconOdt.displayName = 'IconOdt'

export default IconOdt
