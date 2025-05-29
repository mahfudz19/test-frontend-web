import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconStatus = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
  const { className, color, fontSize = 24, ...rest } = props

  return (
    <svg
      {...rest}
      ref={ref}
      className={twMerge(variantsIcon({ color, className }))}
      width={`${fontSize}`}
      height={`${fontSize}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 12 12'
    >
      <path
        fill='currentColor'
        d='M6 1c.278 0 .55.023.816.066l-.936.936a4 4 0 1 0 4.118 4.124l.937-.936A5 5 0 1 1 6 1Zm4.441.562a1.914 1.914 0 0 0-2.707 0L5.15 4.146a.5.5 0 0 0-.12.194l-.984 2.92a.55.55 0 0 0 .696.697l2.92-.982a.5.5 0 0 0 .195-.12l2.584-2.585a1.914 1.914 0 0 0 0-2.707Z'
      />
    </svg>
  )
})

IconStatus.displayName = 'IconStatus'

export default IconStatus
