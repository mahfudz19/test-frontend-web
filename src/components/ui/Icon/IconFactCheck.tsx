import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconFactCheck = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
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
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14z'
      />
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M19.41 10.42L17.99 9l-3.17 3.17l-1.41-1.42L12 12.16L14.82 15zM5 7h5v2H5zm0 4h5v2H5zm0 4h5v2H5z'
      />
    </svg>
  )
})

IconFactCheck.displayName = 'IconFactCheck'

export default IconFactCheck
