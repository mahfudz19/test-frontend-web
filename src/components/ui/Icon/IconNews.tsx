import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconNews = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
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
        d='M4 9V8h1v1H4ZM1 4a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v6.5a.5.5 0 0 0 1 0V4a2 2 0 0 1 2 2v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 10.5V4Zm2.5 1a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Zm0 2a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2Zm4 0a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2Zm0 2a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2Z'
      />
    </svg>
  )
})

IconNews.displayName = 'IconNews'

export default IconNews
