import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconArrowRightStart = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
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
        d='M10.79 3.102c.495-1.003 1.926-1.003 2.421 0l2.358 4.778l5.272.766c1.108.16 1.55 1.522.749 2.303l-3.816 3.719l.901 5.25c.19 1.104-.968 1.945-1.959 1.424l-3.958-2.08a6.5 6.5 0 0 0-9.442-7.43l-.905-.883c-.801-.781-.359-2.142.748-2.303l5.273-.766l2.358-4.778ZM12 17.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0ZM3.5 17a.5.5 0 0 0 0 1h4.793l-1.647 1.646a.5.5 0 1 0 .708.707l2.5-2.5a.5.5 0 0 0 0-.707l-2.5-2.5a.5.5 0 1 0-.708.707L8.293 17H3.5Z'
      />
    </svg>
  )
})

IconArrowRightStart.displayName = 'IconArrowRightStart'

export default IconArrowRightStart
