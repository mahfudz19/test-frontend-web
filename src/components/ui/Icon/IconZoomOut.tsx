import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconZoomOut = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
  const { className, color, fontSize = 24, ...rest } = props
  return (
    <svg
      {...rest}
      ref={ref}
      className={twMerge(variantsIcon({ color, className }))}
      width={`${fontSize}`}
      height={`${fontSize}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
    >
      <g fill='currentColor' fillRule='evenodd'>
        <path d='M120.46 158.29c-30.166 8.65-61.631-8.792-70.281-38.957s8.792-61.63 38.957-70.28s61.63 8.792 70.28 38.957c4.417 15.403-1.937 38.002-9.347 50.872c-.614 1.067 59.212 53.064 59.212 53.064l-17.427 17.63l-53.514-56.72s-10.233 3.241-17.88 5.434M104 144c22.091 0 40-17.909 40-40s-17.909-40-40-40s-40 17.909-40 40s17.909 40 40 40' />
        <path d='M80 96.084v15.992h48V96.084z' />
      </g>
    </svg>
  )
})

IconZoomOut.displayName = 'IconZoomOut'

export default IconZoomOut
