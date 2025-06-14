import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconUpdatenNow = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
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
      <path fill='currentColor' d='m27 25.586l-2-2V21h-2v3.414L25.586 27z' />
      <path
        fill='currentColor'
        d='M24 31a7 7 0 1 1 7-7a7.01 7.01 0 0 1-7 7m0-12a5 5 0 1 0 5 5a5.006 5.006 0 0 0-5-5m-8 9A12.013 12.013 0 0 1 4 16H2a14.016 14.016 0 0 0 14 14zM12 8H7.078A11.984 11.984 0 0 1 28 16h2A13.978 13.978 0 0 0 6 6.234V2H4v8h8z'
      />
    </svg>
  )
})

IconUpdatenNow.displayName = 'IconUpdatenNow'

export default IconUpdatenNow
