import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconTimeOut = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
  const { className, color, fontSize = 24, ...rest } = props

  return (
    <svg
      {...rest}
      ref={ref}
      className={twMerge(variantsIcon({ color, className }))}
      xmlns='http://www.w3.org/2000/svg'
      width={`${fontSize}`}
      height={`${fontSize}`}
      viewBox='0 0 16 16'
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6.229.199a8 8 0 0 1 9.727 6.964a.75.75 0 0 1-1.492.157a6.5 6.5 0 1 0-7.132 7.146a.75.75 0 1 1-.154 1.492a8 8 0 0 1-.95-15.76ZM8 3a.75.75 0 0 1 .75.75V9h-4a.75.75 0 0 1 0-1.5h2.5V3.75A.75.75 0 0 1 8 3m2.22 7.22a.75.75 0 0 1 1.06 0L13 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L14.06 13l1.72 1.72a.75.75 0 1 1-1.06 1.06L13 14.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L11.94 13l-1.72-1.72a.75.75 0 0 1 0-1.06'
        clip-rule='evenodd'
      />
    </svg>
  )
})

IconTimeOut.displayName = 'IconTimeOut'

export default IconTimeOut
