import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconPlan = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
  const { className, color, fontSize = 24, ...rest } = props

  return (
    <svg
      {...rest}
      ref={ref}
      className={twMerge(variantsIcon({ color, className }))}
      xmlns='http://www.w3.org/2000/svg'
      width={`${fontSize}`}
      height={`${fontSize}`}
      viewBox='0 0 32 32'
    >
      <path
        fill='currentColor'
        d='M31 8c0-.4-.2-.7-.5-.9l-7-4c-.2-.1-.3-.1-.5-.1s-.3 0-.5.1L16 6.8L9.5 3.1C9.3 3 9.2 3 9 3s-.3 0-.5.1l-7 4c-.3.2-.5.5-.5.9v20c0 .6.4 1 1 1c.2 0 .3-.1.5-.1L9 25.2l6.5 3.7c.2.1.3.1.5.1s.3 0 .5-.1l6.5-3.7l6.5 3.7c.1.1.3.1.5.1c.6 0 1-.4 1-1V8zM3 8.6l5-2.9v17.7l-5 2.9V8.6zm12 17.7l-5-2.9V5.7l5 2.9v17.7zm7-2.9l-5 2.9V8.6l5-2.9v17.7zm2 0V5.7l5 2.9v17.7l-5-2.9z'
      />
    </svg>
  )
})

IconPlan.displayName = 'IconPlan'

export default IconPlan
