import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Wrapper } from './RevealOnScroll.styled'

export type RevealOnScrollProps = {
  children: ReactNode
  className?: string
  rootMargin?: string
  threshold?: number
}

export function RevealOnScroll({
  children,
  className,
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.06,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { root: null, rootMargin, threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return (
    <Wrapper ref={ref} $visible={visible} className={className}>
      {children}
    </Wrapper>
  )
}
