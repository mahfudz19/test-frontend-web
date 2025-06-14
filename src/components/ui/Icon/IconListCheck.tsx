import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconListCheck = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
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
      <g fill='none'>
        <path d='M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z' />
        <path
          fill='currentColor'
          d='M7.06 16.836a1.25 1.25 0 0 1 1.86 1.666l-.091.102l-2.298 2.298a1.5 1.5 0 0 1-2.008.103l-.114-.103l-1.237-1.238a1.25 1.25 0 0 1 1.666-1.859l.102.091l.53.53l1.59-1.59ZM20 17.5a1.5 1.5 0 0 1 0 3h-8a1.5 1.5 0 1 1 0-3h8ZM8.83 9.836a1.25 1.25 0 0 1 0 1.768l-2.3 2.298a1.5 1.5 0 0 1-2.122 0l-1.237-1.238a1.25 1.25 0 1 1 1.768-1.768l.53.53l1.59-1.59a1.25 1.25 0 0 1 1.769 0ZM20 10.5a1.5 1.5 0 0 1 .145 2.993L20 13.5h-8a1.5 1.5 0 0 1-.144-2.993L12 10.5h8ZM7.06 2.836a1.25 1.25 0 0 1 1.86 1.666l-.091.101L6.53 6.902a1.5 1.5 0 0 1-2.008.103l-.114-.103l-1.237-1.238a1.25 1.25 0 0 1 1.666-1.859l.102.091l.53.53l1.59-1.59ZM20 3.5a1.5 1.5 0 0 1 .145 2.993L20 6.5h-8a1.5 1.5 0 0 1-.144-2.993L12 3.5h8Z'
        />
      </g>
    </svg>
  )
})

IconListCheck.displayName = 'IconListCheck'

export default IconListCheck
