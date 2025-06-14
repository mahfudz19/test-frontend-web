import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconUsersSync = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
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
        d='M8 4.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0M11.5 6a5.5 5.5 0 0 0-1.578.23a2 2 0 1 1 3.155 0A5.5 5.5 0 0 0 11.5 6M3 8h4.257A5.48 5.48 0 0 0 6 11.5q0 .501.087.977q-.279.023-.587.023c-4 0-4-2.925-4-2.925V9.5A1.5 1.5 0 0 1 3 8m4 3.5a4.5 4.5 0 1 0 9 0a4.5 4.5 0 0 0-9 0m6.5-3a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-.5.5H12a.5.5 0 0 1 0-1h.468a2 2 0 0 0-.933-.25a2 2 0 0 0-1.45.586a.5.5 0 0 1-.706-.707A3 3 0 0 1 13 9.152V9a.5.5 0 0 1 .5-.5m-.876 5.532A3 3 0 0 1 10 13.848V14a.5.5 0 0 1-1 0v-1.5a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1h-.468q.075.042.155.077a2 2 0 0 0 2.227-.413a.5.5 0 0 1 .707.707c-.285.285-.624.51-.997.66'
      />
    </svg>
  )
})

IconUsersSync.displayName = 'IconUsersSync'

export default IconUsersSync
