import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconTachometer = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
  const { className, color, fontSize = 24, ...rest } = props

  return (
    <svg
      {...rest}
      ref={ref}
      className={twMerge(variantsIcon({ color, className }))}
      xmlns='http://www.w3.org/2000/svg'
      width={`${fontSize}`}
      height={`${fontSize}`}
      viewBox='0 0 1792 1408'
    >
      <path
        fill='currentColor'
        d='M384 896q0-53-37.5-90.5T256 768t-90.5 37.5T128 896t37.5 90.5T256 1024t90.5-37.5T384 896zm192-448q0-53-37.5-90.5T448 320t-90.5 37.5T320 448t37.5 90.5T448 576t90.5-37.5T576 448zm428 481l101-382q6-26-7.5-48.5T1059 469t-48 6.5t-30 39.5L880 897q-60 5-107 43.5t-63 98.5q-20 77 20 146t117 89t146-20t89-117q16-60-6-117t-72-91zm660-33q0-53-37.5-90.5T1536 768t-90.5 37.5T1408 896t37.5 90.5t90.5 37.5t90.5-37.5T1664 896zm-640-640q0-53-37.5-90.5T896 128t-90.5 37.5T768 256t37.5 90.5T896 384t90.5-37.5T1024 256zm448 192q0-53-37.5-90.5T1344 320t-90.5 37.5T1216 448t37.5 90.5T1344 576t90.5-37.5T1472 448zm320 448q0 261-141 483q-19 29-54 29H195q-35 0-54-29Q0 1158 0 896q0-182 71-348t191-286T548 71T896 0t348 71t286 191t191 286t71 348z'
      />
    </svg>
  )
})

IconTachometer.displayName = 'IconTachometer'

export default IconTachometer
