import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconProps } from './Type'
import variantsIcon from './variant'

const IconLatex = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
  const { className, color, fontSize = 24, ...rest } = props

  return (
    <svg
      {...rest}
      ref={ref}
      className={twMerge(variantsIcon({ color, className }))}
      xmlns='http://www.w3.org/2000/svg'
      width={`${fontSize}`}
      height={`${fontSize}`}
      fill='#000000'
      version='1.1'
      id='Icons'
      viewBox='0 0 18 18'
    >
      <path
        fill='#494c4e'
        d='M18 16.5c0 .83-.67 1.5-1.5 1.5h-7c-.83 0-1.5-.67-1.5-1.5 0-.293.095-.566.25-.814.443-.707.855-1.433 1.272-2.157l1.38-2.405c.364-.636.73-1.27 1.088-1.91.02-.038.256-.385.23-.425l-.443-.72-1.045-1.697L9.51 4.388l-.838-1.36c-.247-.4-.58-.815-.65-1.292-.05-.34.01-.696.185-.993C8.49.258 9.02-.003 9.572 0H17c.55 0 1 .45 1 1s-.45 1-1 1h-5.43l.59.983c.415.694.83 1.387 1.247 2.08l1.13 1.887c.197.33.472.673.454 1.074-.01.27-.13.517-.273.74-.35.55-.672 1.12-1.004 1.68l-1.438 2.425-1.092 1.84c-.016.025-.142.29-.173.29h5.49c.83 0 1.5.67 1.5 1.5zM1 18c-.08 0-.16-.01-.243-.03-.536-.134-.86-.677-.728-1.212l4-16c.134-.536.678-.862 1.213-.728s.86.677.727 1.213l-4 16c-.114.454-.52.757-.97.757z'
      />
    </svg>
  )
})

IconLatex.displayName = 'IconLatex'

export default IconLatex
