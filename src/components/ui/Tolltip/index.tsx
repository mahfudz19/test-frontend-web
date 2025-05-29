'use client'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { MenuProps } from '../Menu'
import MenuHoverHook from '../Menu/MenuHoverHook'
import Popover from '../Popover'
import Arrow from './Arrow'

export interface TooltipProps {
  title: string | ReactNode
  anchor?: MenuProps['anchor']
  arrow?: boolean | string
  classNames?: { button?: string; menu?: string }
  noCursorInTooltip?: boolean
}

const Tooltip = (props: TooltipProps & { children: ReactNode }) => {
  let { title, children, anchor, classNames, noCursorInTooltip, arrow, ...rest } = props

  const { button, menu } = MenuHoverHook()
  const arrowColor = typeof arrow === 'string' ? arrow : ''
  if (noCursorInTooltip) {
    delete (menu as any).onMouseEnter
    delete (menu as any).onMouseLeave
  }

  return (
    <>
      <div {...button} className={twMerge('inline', classNames?.button)}>
        {children}
      </div>

      <Popover zIndex={50} {...menu} anchor={anchor} disableBackDrop {...rest} noLastFocusedElement>
        <div
          className={twMerge(
            'text-sm relative',
            'rounded-lg p-1 min-w-[10rem]',
            'bg-secondary-dark/80 border-0 text-white min-w-fit',
            classNames?.menu
          )}
        >
          {title}
          {arrow !== undefined ? <Arrow position={anchor} color={arrowColor} /> : <></>}
        </div>
      </Popover>
    </>
  )
}

export default Tooltip
