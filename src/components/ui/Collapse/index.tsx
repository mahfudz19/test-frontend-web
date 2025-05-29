'use client'
import { HTMLAttributes, forwardRef, useEffect, useRef, useState, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

interface MoreProps {
  isOpen: boolean
  duration?: number
  minCloseHeight?: number
}

export type CollapseProps = HTMLAttributes<HTMLDivElement> & MoreProps

const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  ({ isOpen, duration = 300, className, children, minCloseHeight = 0, ...rest }, ref) => {
    const [height, setHeight] = useState<number | undefined>(undefined)
    const [isResizing, setIsResizing] = useState(false)
    const childCollapseRef = useRef<HTMLDivElement | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const observerRef = useRef<ResizeObserver | null>(null)

    const updateHeight = useCallback(() => {
      if (!childCollapseRef.current) return
      const newHeight = childCollapseRef.current.scrollHeight
      setHeight(newHeight)
      setIsResizing(true)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setIsResizing(false), 100)
    }, [])

    useEffect(() => {
      if (!childCollapseRef.current) return

      observerRef.current = new ResizeObserver(updateHeight)
      observerRef.current.observe(childCollapseRef.current)

      updateHeight() // Pastikan tinggi diatur saat pertama kali render

      return () => {
        observerRef.current?.disconnect()
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }, [updateHeight])

    return (
      <div
        {...rest}
        ref={ref}
        className={twMerge(
          'transition-all ease-in-out overflow-hidden',
          isResizing ? 'duration-[100ms]' : `duration-${duration}`,
          className
        )}
        style={{
          maxHeight: isOpen ? (height ? height + 10 : 'auto') : minCloseHeight
        }}
      >
        <div ref={childCollapseRef}>{children}</div>
      </div>
    )
  }
)

Collapse.displayName = 'Collapse'

export default Collapse
