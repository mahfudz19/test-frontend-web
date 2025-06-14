import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconAssignment = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
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
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        color='currentColor'
      >
        <path d='M4 3H3a1 1 0 0 0-1 1v14l1.5 3L5 18V4a1 1 0 0 0-1-1m17 9.001v-4c0-2.358 0-3.536-.732-4.269C19.535 3 18.357 3 16 3h-3c-2.357 0-3.536 0-4.268.732C8 4.465 8 5.643 8 8.001v8c0 2.358 0 3.537.732 4.27c.62.62 1.561.714 3.268.729m0-14h5m-5 4h5' />
        <path d='M14 19s1.5.5 2.5 2c0 0 1.5-4 5.5-6M2 7h3' />
      </g>
    </svg>
  )
})

IconAssignment.displayName = 'IconAssignment'

export default IconAssignment
