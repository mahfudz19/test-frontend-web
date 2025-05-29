import { Children, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

interface CarouselProps {
  activeIndex: number
  children: React.ReactNode
  autoScrollUp?: boolean
  classNames?: { root?: string; container?: string; child?: string }
}

export const CarouselScrollUp: React.FC<CarouselProps> = ({ activeIndex, children, autoScrollUp, classNames }) => {
  useEffect(() => {
    if (autoScrollUp) window?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeIndex, autoScrollUp])

  return (
    <div className={twMerge('relative w-full overflow-hidden', classNames?.root)}>
      <div
        className={twMerge('w-full flex transition-transform duration-300 ease-in-out', classNames?.container)}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {Children.map(children, (child, index) => (
          <div key={`${index}`} className={twMerge('w-full flex-shrink-0', classNames?.child)}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
export const CarouselRegulas: React.FC<CarouselProps> = ({ activeIndex, children, classNames }) => {
  return (
    <div className={twMerge('relative w-full overflow-hidden', classNames?.root)}>
      <div
        className={twMerge('w-full flex transition-transform duration-300 ease-in-out', classNames?.container)}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {Children.map(children, (child, index) => (
          <div key={`${index}`} className={twMerge('w-full flex-shrink-0', classNames?.child)}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
export const Carousel: React.FC<CarouselProps> = ({ activeIndex, children, autoScrollUp, classNames }) => {
  if (autoScrollUp) return CarouselScrollUp({ activeIndex, children, autoScrollUp, classNames })
  return CarouselRegulas({ activeIndex, children, classNames })
}

export default Carousel
