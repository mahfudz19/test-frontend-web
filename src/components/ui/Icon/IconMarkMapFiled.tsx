import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconMarkMapFiled = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
  const { className, color, fontSize = 24, ...rest } = props

  return (
    <svg
      {...rest}
      ref={ref}
      className={twMerge(variantsIcon({ color, className }))}
      xmlns='http://www.w3.org/2000/svg'
      width={`${fontSize}`}
      height={`${fontSize}`}
      version='1.1'
      id='Layer_1'
      viewBox='0 0 24 24'
    >
      <mask id='lineMdMapMarkerAltFilled0'>
        <path
          fill='#fff'
          stroke='#fff'
          strokeLinecap='round'
          strokeWidth='2'
          d='M12 20.5C12 20.5 6 13.5 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9C18 13.5 12 20.5 12 20.5z'
        >
          <animate
            fill='freeze'
            attributeName='d'
            dur='0.4s'
            keyTimes='0;0.7;1'
            values='M12 20.5C12 20.5 11 19 11 18C11 17.5 11.5 17 12 17C12.5 17 13 17.5 13 18C13 19 12 20.5 12 20.5z;M12 20.5C12 20.5 5 13 5 8C5 4.5 8 1 12 1C16 1 19 4.5 19 8C19 13 12 20.5 12 20.5z;M12 20.5C12 20.5 6 13.5 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9C18 13.5 12 20.5 12 20.5z'
          />
        </path>
        <circle cx='12' cy='9' r='2.5' fill-opacity='0'>
          <animate fill='freeze' attributeName='fill-opacity' begin='0.3s' dur='0.15s' values='0;1' />
        </circle>
      </mask>
      <rect width='24' height='24' fill='currentColor' mask='url(#lineMdMapMarkerAltFilled0)' />
    </svg>
  )
})

IconMarkMapFiled.displayName = 'IconMarkMapFiled'

export default IconMarkMapFiled
