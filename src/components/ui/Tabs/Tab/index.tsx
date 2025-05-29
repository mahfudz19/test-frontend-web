'use client'

import * as React from 'react'
import { twMerge } from 'tailwind-merge'

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  label: React.ReactNode
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  isActive?: boolean
  href?: string
  LinkComponent?: any
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props: TabProps, ref) => {
  const { value, label, disabled, className, isActive, href, LinkComponent = 'button', ...rest } = props

  if (LinkComponent !== 'button' && disabled) {
    return (
      <button
        {...rest}
        ref={ref}
        role='tab'
        type='button'
        aria-selected={isActive}
        aria-disabled={disabled}
        disabled={disabled}
        data-value={value}
        tabIndex={isActive ? 0 : -1}
        className={twMerge(
          'transition-colors duration-200',
          'rounded-[inherit] z-10',
          'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium',
          'focus-visible:outline-none',
          'disabled:pointer-events-none',
          'disabled:opacity-50',
          'hover:text-text-secondary',
          'text-inherit',
          'min-w-fit',
          'min-h-max',
          className
        )}
      >
        {label}
      </button>
    )
  }

  return (
    <LinkComponent
      {...rest}
      ref={ref}
      role='tab'
      type='button'
      href={href}
      aria-selected={isActive}
      aria-disabled={disabled}
      disabled={disabled}
      data-value={value}
      tabIndex={isActive ? 0 : -1}
      className={twMerge(
        'transition-colors duration-200',
        'rounded-[inherit] z-10',
        'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium',
        'focus-visible:outline-none',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
        'hover:text-text-secondary',
        'text-inherit',
        'min-w-fit',
        'min-h-max',
        className
      )}
    >
      {label}
    </LinkComponent>
  )
})

Tab.displayName = 'Tab'

export default Tab
