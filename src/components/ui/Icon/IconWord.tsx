import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconWord = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
  const { className, color, fontSize = 24, ...rest } = props

  return (
    <svg
      {...rest}
      ref={ref}
      className={twMerge(variantsIcon({ color, className }))}
      width={`${fontSize}`}
      height={`${fontSize}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
    >
      <path
        fill='currentColor'
        d='M488.877 52.447H302.306V5.92h-34.779L0 52.563v406.99l265.957 46.527h36.349v-46.353h174.59c9.887-.465 20.879.291 29.37-5.757c6.804-10.41 5.06-23.438 5.641-35.186V75.012c1.221-13.26-9.77-23.903-23.03-22.565m-294.862 282.59c-9.712 5.06-24.252-.233-35.767.581c-7.735-38.5-16.75-76.768-23.67-115.443c-6.805 37.57-15.645 74.79-23.438 112.128c-11.166-.581-22.39-1.28-33.615-2.035c-9.655-51.18-20.995-102.01-30.01-153.305c9.945-.465 19.948-.872 29.893-1.221c5.99 37.047 12.795 73.919 18.03 111.024c8.2-38.036 16.574-76.071 24.717-114.106c11.05-.64 22.1-1.105 33.15-1.687c7.735 39.257 15.644 78.455 24.019 117.537c6.572-40.361 13.841-80.607 20.879-120.91c11.631-.407 23.263-1.047 34.836-1.745c-13.143 56.355-24.659 113.176-39.024 169.182m290.212 97.069H302.306v-36.527h151.21v-23.263h-151.21v-29.079h151.21v-23.263h-151.21v-29.08h151.21v-23.262h-151.21v-29.08h151.21V215.29h-151.21v-29.08h151.21v-23.263h-151.21v-29.079h151.21v-23.263h-151.21v-30.71h181.921z'
      />
    </svg>
  )
})

IconWord.displayName = 'IconWord'

export default IconWord
