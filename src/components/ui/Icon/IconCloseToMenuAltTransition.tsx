import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconCloseToMenuAltTransition = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
  const { className, color, fontSize = 24, ...rest } = props

  return (
    <svg
      {...rest}
      ref={ref}
      className={twMerge(variantsIcon({ color, className }))}
      xmlns='http://www.w3.org/2000/svg'
      width={`${fontSize}`}
      height={`${fontSize}`}
      viewBox='0 0 24 24'
    >
      <g fill='none' stroke='currentColor' strokeLinecap='round' strokeWidth='2'>
        <path d='M5 5L19 19'>
          <animate fill='freeze' attributeName='d' dur='0.4s' values='M5 5L19 19;M5 5L19 5' />
        </path>
        <path d='M12 12H12' opacity='0'>
          <animate fill='freeze' attributeName='d' begin='0.2s' dur='0.4s' values='M12 12H12;M5 12H19' />
          <animate fill='freeze' attributeName='opacity' begin='0.2s' dur='0.4s' to='1' />
        </path>
        <path d='M5 19L19 5'>
          <animate fill='freeze' attributeName='d' dur='0.4s' values='M5 19L19 5;M5 19L19 19' />
        </path>
      </g>
    </svg>
  )
})

IconCloseToMenuAltTransition.displayName = 'IconCloseToMenuAltTransition'

export default IconCloseToMenuAltTransition
