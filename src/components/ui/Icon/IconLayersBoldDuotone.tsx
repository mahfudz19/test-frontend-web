import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconLayersBoldDuotone = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
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
      <g fill='currentColor'>
        <path d='M4.979 9.685C2.993 8.891 2 8.494 2 8s.993-.89 2.979-1.685l2.808-1.123C9.773 4.397 10.767 4 12 4c1.234 0 2.227.397 4.213 1.192l2.808 1.123C21.007 7.109 22 7.506 22 8s-.993.89-2.979 1.685l-2.808 1.123C14.227 11.604 13.233 12 12 12c-1.234 0-2.227-.397-4.213-1.191L4.98 9.684Z' />
        <path
          fillRule='evenodd'
          d='M2 8c0 .494.993.89 2.979 1.685l2.808 1.123C9.773 11.604 10.767 12 12 12c1.234 0 2.227-.397 4.213-1.191l2.808-1.124C21.007 8.891 22 8.494 22 8s-.993-.89-2.979-1.685l-2.808-1.123C14.227 4.397 13.233 4 12 4c-1.234 0-2.227.397-4.213 1.192L4.98 6.315C2.993 7.109 2 7.506 2 8Z'
          clipRule='evenodd'
        />
        <path
          d='m5.766 10l-.787.315C2.993 11.109 2 11.507 2 12c0 .493.993.89 2.979 1.685l2.808 1.123C9.773 15.604 10.767 16 12 16c1.234 0 2.227-.397 4.213-1.191l2.808-1.124C21.007 12.891 22 12.493 22 12c0-.493-.993-.89-2.979-1.685L18.234 10l-2.021.809C14.227 11.603 13.233 12 12 12c-1.234 0-2.227-.397-4.213-1.191L5.767 10Z'
          opacity='.7'
        />
        <path
          d='m5.766 14l-.787.315C2.993 15.109 2 15.507 2 16c0 .494.993.89 2.979 1.685l2.808 1.123C9.773 19.604 10.767 20 12 20c1.234 0 2.227-.397 4.213-1.192l2.808-1.123C21.007 16.891 22 16.494 22 16c0-.493-.993-.89-2.979-1.685L18.234 14l-2.021.809C14.227 15.603 13.233 16 12 16c-1.234 0-2.227-.397-4.213-1.191L5.767 14Z'
          opacity='.4'
        />
      </g>
    </svg>
  )
})

IconLayersBoldDuotone.displayName = 'IconLayersBoldDuotone'

export default IconLayersBoldDuotone
