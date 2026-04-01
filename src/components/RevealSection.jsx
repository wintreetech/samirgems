import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

function RevealSection({ className = '', children, threshold = 0.2, id = '', dataSection = '' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting)
      },
      { threshold, rootMargin: '-8% 0px -8% 0px' },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [threshold])

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    const ctx = gsap.context(() => {
      const animatedChildren = node.querySelectorAll('[data-animate]')

      gsap.killTweensOf(node)
      gsap.killTweensOf(animatedChildren)

      gsap.set(node, {
        autoAlpha: 1,
      })

      if (!animatedChildren.length) {
        gsap.to(node, {
          y: active ? 0 : 18,
          scale: active ? 1 : 0.992,
          duration: active ? 0.9 : 0.55,
          ease: active ? 'power3.out' : 'power2.out',
        })
        return
      }

      gsap.to(node, {
        y: active ? 0 : 22,
        scale: active ? 1 : 0.992,
        duration: active ? 0.9 : 0.55,
        ease: active ? 'power3.out' : 'power2.out',
      })
      
      if (active) {
        gsap.fromTo(
          animatedChildren,
          { autoAlpha: 0.15, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.12,
            overwrite: 'auto',
          },
        )
      } else {
        gsap.to(animatedChildren, {
          autoAlpha: 0.72,
          y: 16,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.04,
          overwrite: 'auto',
        })
      }
    }, node)

    return () => ctx.revert()
  }, [active])

  return (
    <section
      ref={ref}
      id={id}
      data-section={dataSection}
      className={`reveal-section ${active ? 'is-active' : ''} ${className}`.trim()}
    >
      {children}
    </section>
  )
}

export default RevealSection
