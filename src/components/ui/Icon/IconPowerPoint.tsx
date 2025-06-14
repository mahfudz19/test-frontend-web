import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconPowerPoint = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
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
        d='M488.698 58.311H302.231V5.981h-32.968L0 52.614v406.89l266.066 46.515h36.165v-58.144h174.49c9.942-.465 20.99.524 29.478-5.64c6.745-10.407 5.11-23.432 5.692-35.177V81.104c1.337-13.373-9.82-24.072-23.193-22.793M170.535 275.304c-13.198 6.744-28.316 5.814-42.677 5.349l-.058 68.202l-34.596-2.907l.058-186.35c31.573 1.511 69.831-12.501 95.996 11.163c25.06 30.41 18.431 86.344-18.723 104.543m313.572 145.13H302.231v-36.518h139.545V360.66H302.231v-29.072h139.545V308.33H302.289s-.058-22.792-.116-34.188c23.025 7.151 49.248 6.977 69.83-6.861c22.27-13.199 33.898-38.375 35.817-63.493h-76.517v-75.936l-29.072 5.873V85.752h181.876zm-141.18-304.735c40.41 1.86 74.429 36.021 76.58 76.315h-76.58zM127.8 191.053c11.454-.523 25.641-2.616 33.374 8.14c6.629 11.397 6.28 26.398.756 38.143c-6.628 11.977-21.63 10.815-33.2 12.21c-1.22-19.478-1.105-38.956-.93-58.493'
      />
    </svg>
  )
})

IconPowerPoint.displayName = 'IconPowerPoint'

export default IconPowerPoint
