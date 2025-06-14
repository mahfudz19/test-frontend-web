import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconRedo = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
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
        d='M16.53 5.47a.75.75 0 1 0-1.06 1.06zM19 9l.53.53a.75.75 0 0 0 0-1.06zm-3.53 2.47a.75.75 0 1 0 1.06 1.06zM19 17.75a.75.75 0 0 0 0-1.5zM15.47 6.53l3 3l1.06-1.06l-3-3zm3 1.94l-3 3l1.06 1.06l3-3zm.53-.22H8v1.5h11zM3.25 13A4.75 4.75 0 0 0 8 17.75v-1.5A3.25 3.25 0 0 1 4.75 13zM8 8.25A4.75 4.75 0 0 0 3.25 13h1.5A3.25 3.25 0 0 1 8 9.75zm11 8H8v1.5h11z'
      />
    </svg>
  )
})

IconRedo.displayName = 'IconRedo'

export default IconRedo
