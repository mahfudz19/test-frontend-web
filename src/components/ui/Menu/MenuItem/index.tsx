'use client'
import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributeAnchorTarget, HtmlHTMLAttributes, JSX, ReactNode, forwardRef, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import Ripple from '../../Ripple'

interface content {
  content?: string
  selected?: string
}

interface MoreMenuItemProps {
  variant?: 'outlined' | 'contained'
  href?: string
  onClickDownloadURL?: string
  Component?: any
  Link?: any
  target?: HTMLAttributeAnchorTarget
  selected?: boolean
  noRipple?: boolean
  iconStart?: JSX.Element
  iconEnd?: JSX.Element
  classNames?: {
    li?: string
    selected?: string
    icon_start?: string | content
    content?: string | content
    icon_end?: string | content
  }
}

export type MenuItemProps = HtmlHTMLAttributes<HTMLLIElement> & VariantProps<typeof variants> & MoreMenuItemProps

const variants = cva(
  [
    'flex items-center justify-between gap-2',
    'overflow-hidden relative',
    'rounded-lg',
    'hover:bg-gray-500/10',
    'cursor-pointer',
    'text-text-primary dark:text-white'
  ],
  {
    variants: {
      variant: {
        outlined: ['border-[0.0625rem] flex items-center justify-between gap-1 text-sm p-2 my-1 rounded-lg'],
        contained: ['p-2']
      }
    },
    defaultVariants: {
      variant: 'contained'
    }
  }
)

interface IconStartProps {
  iconStart?: JSX.Element
  selected?: boolean
  classNames?: {
    icon_start?: string | content
  }
}

const IconStart = ({ iconStart, classNames, selected }: IconStartProps) => {
  let iconClass
  let iconSelected
  if (classNames?.icon_start && typeof classNames.icon_start !== 'string') {
    iconClass = classNames.icon_start.content
  } else {
    iconClass = classNames?.icon_start as string
  }

  if (selected && typeof classNames?.icon_start !== 'string' && classNames?.icon_start?.selected) {
    iconSelected = classNames?.icon_start?.selected
  }

  return <span className={twMerge(iconClass, iconSelected)}>{iconStart}</span>
}

interface IconEndProps {
  IconEnd?: JSX.Element
  selected?: boolean
  classNames?: {
    icon_end?: string | content
  }
}

const IconEnd = ({ IconEnd, classNames, selected }: IconEndProps) => {
  let iconClass
  let iconSelected
  if (classNames?.icon_end && typeof classNames.icon_end !== 'string') {
    iconClass = classNames.icon_end.content
  } else {
    iconClass = classNames?.icon_end as string
  }

  if (selected && typeof classNames?.icon_end !== 'string' && classNames?.icon_end?.selected) {
    iconSelected = classNames?.icon_end?.selected
  }

  return <span className={twMerge(iconClass, iconSelected)}>{IconEnd}</span>
}

interface ContentProps {
  children?: ReactNode
  selected?: boolean
  classNames?: {
    content?: string | content
  }
}

const Content = ({ children, classNames, selected }: ContentProps) => {
  let iconClass
  let iconSelected
  if (classNames?.content && typeof classNames.content !== 'string') {
    iconClass = classNames.content.content
  } else {
    iconClass = classNames?.content as string
  }

  if (selected && typeof classNames?.content !== 'string' && classNames?.content?.selected) {
    iconSelected = classNames?.content?.selected
  }

  return <span className={twMerge('flex-grow', iconClass, iconSelected)}>{children}</span>
}

const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>((props: MenuItemProps, _ref) => {
  const {
    variant,
    className,
    classNames,
    selected,
    href,
    iconStart,
    iconEnd,
    Link,
    Component = 'li',
    onClickDownloadURL,
    children,
    noRipple,
    ...rest
  } = props
  const ref = useRef<HTMLLIElement | null>(null)

  function onClickDownloadLink(url: string) {
    const a = document.createElement('a')
    a.href = url
    a.click()
  }
  if (onClickDownloadURL) {
    rest.onClick = () => onClickDownloadLink(onClickDownloadURL)
  }

  return Link ? (
    <Link
      ref={ref}
      role='menuitem'
      tabIndex={0}
      href={href}
      className={twMerge(
        variants({ variant, className }),
        classNames?.li,
        selected && (classNames?.selected || 'bg-gray-200/70')
      )}
      style={{ WebkitTapHighlightColor: 'transparent' }}
      {...rest}
    >
      {iconStart && <IconStart iconStart={iconStart} classNames={classNames} selected={selected} />}
      <Content classNames={classNames} selected={selected}>
        {children}
      </Content>
      {iconEnd && <IconEnd IconEnd={iconEnd} classNames={classNames} selected={selected} />}
      {!noRipple && <Ripple color='white' opacity={0.25} />}
    </Link>
  ) : (
    <Component
      ref={ref}
      tabIndex={0}
      role='menuitem'
      className={twMerge(
        'flex items-center justify-between gap-1',
        'overflow-hidden relative',
        variants({ variant, className }),
        classNames?.li,
        selected && (classNames?.selected || 'bg-gray-200/70')
      )}
      style={{ WebkitTapHighlightColor: 'transparent' }}
      {...rest}
    >
      {iconStart && <IconStart iconStart={iconStart} classNames={classNames} selected={selected} />}
      <Content classNames={classNames} selected={selected}>
        {children}
      </Content>
      {iconEnd && <IconEnd IconEnd={iconEnd} classNames={classNames} selected={selected} />}
      {!noRipple && <Ripple color='white' opacity={0.25} />}
    </Component>
  )
})

MenuItem.displayName = 'MenuItem'

export default MenuItem
