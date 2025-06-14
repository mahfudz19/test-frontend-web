import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconUserSync = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
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
        d='M9.626 5.07a2.75 2.75 0 1 0-3.299 1.848a5.5 5.5 0 0 1 2.095-1.512a5.5 5.5 0 0 1 1.204-.337M5.6 8a5.46 5.46 0 0 0-.6 2.5a5.5 5.5 0 0 0 1.016 3.186l.008.011q.096.133.198.26C3.555 13.653 2 11.803 2 10v-.5A1.5 1.5 0 0 1 3.5 8zm.4 2.5a4.5 4.5 0 1 0 9 0a4.5 4.5 0 0 0-9 0m6.5-3a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-.5.5H11a.5.5 0 0 1 0-1h.468a2 2 0 0 0-.933-.25a2 2 0 0 0-1.45.586a.5.5 0 0 1-.706-.707A3 3 0 0 1 12 8.152V8a.5.5 0 0 1 .5-.5m-.876 5.532A3 3 0 0 1 9 12.848V13a.5.5 0 0 1-1 0v-1.5a.5.5 0 0 1 .5-.5H10a.5.5 0 0 1 0 1h-.468a2 2 0 0 0 .933.25a2 2 0 0 0 1.45-.586a.5.5 0 0 1 .706.707c-.285.285-.624.51-.997.66'
      />
    </svg>
  )
})

IconUserSync.displayName = 'IconUserSync'

export default IconUserSync
