import { VariantProps, cva } from 'class-variance-authority'
import { InputHTMLAttributes, JSX, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const variants = cva(
  [
    'relative',
    'transition-all duration-300 ease-in-out ',
    'flex items-center justify-center rounded-full border-2',
    'before:absolute before:rounded-full before:transition-transform before:scale-0 peer-checked:before:scale-100',
    'peer-focus-visible:outline peer-focus-visible:outline peer-focus-visible:outline-blue-500 peer-focus-visible:outline-offset-1'
  ],
  {
    variants: {
      color: {
        default: 'border-gray-300 text-gray-500 peer-checked:before:bg-gray-500 peer-focus-visible:outline-gray-500',
        primary: 'border-blue-500 text-blue-500 peer-checked:before:bg-blue-500 peer-focus-visible:outline-blue-500',
        secondary: 'border-gray-500 text-gray-500 peer-checked:before:bg-gray-500 peer-focus-visible:outline-gray-500',
        success:
          'border-green-500 text-green-500 peer-checked:before:bg-green-500 peer-focus-visible:outline-green-500',
        error: 'border-red-500 text-red-500 peer-checked:before:bg-red-500 peer-focus-visible:outline-red-500'
      },
      sizes: {
        sm: 'w-4 h-4 before:w-[0.5rem] before:h-[0.5rem]',
        md: 'w-5 h-5 before:w-[0.67rem] before:h-[0.67rem]',
        lg: 'w-6 h-6 before:w-[0.87rem] before:h-[0.87rem]'
      },
      isDisabled: { true: 'opacity-50 pointer-events-none', false: '' }
    },
    defaultVariants: { color: 'primary', sizes: 'md', isDisabled: false }
  }
)

interface MoreProps {
  label?: string
  helperText?: string | JSX.Element
  error?: boolean
  classNames?: { root?: string; radio?: string; label?: string; helperText?: string }
  isDisabled?: boolean
  labelPosisition?: 'top' | 'left' | 'right' | 'bottom'
}

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof variants> & MoreProps

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    label,
    helperText,
    error,
    className,
    color,
    sizes,
    isDisabled,
    onChange,
    labelPosisition = 'right',
    ...rest
  } = props

  const getLabelLayoutClass = (position: RadioProps['labelPosisition']) => {
    switch (position) {
      case 'top':
        return 'flex-col-reverse items-center [&>span]:mb-1'
      case 'bottom':
        return 'flex-col items-center [&>span]:mt-1'
      case 'left':
        return 'flex-row-reverse items-center [&>span]:mr-2'
      case 'right':
      default:
        return 'flex-row items-center [&>span]:ml-2'
    }
  }

  return (
    <label
      className={twMerge(
        'inline-flex items-center cursor-pointer relative',
        getLabelLayoutClass(labelPosisition),
        isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      )}
    >
      <input type='radio' className='sr-only peer' disabled={isDisabled} ref={ref} onChange={onChange} {...rest} />
      <div className={twMerge(variants({ color, sizes, isDisabled }), className)} />
      {label && <span className='text-sm'>{label}</span>}
      {helperText && <p className={twMerge('text-xs mt-1', error ? 'text-red-500' : 'text-gray-500')}>{helperText}</p>}
    </label>
  )
})

Radio.displayName = 'Radio'

export default Radio
