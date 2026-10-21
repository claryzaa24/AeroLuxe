import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useScrollAnimation() {
  let ctx: gsap.Context | null = null

  const initContext = (scope: Element | string) => {
    ctx = gsap.context(() => {}, scope)
    return ctx
  }

  const fadeUp = (
    elements: string | Element | Element[],
    options: {
      duration?: number
      delay?: number
      y?: number
      stagger?: number
      scale?: number
      trigger?: string | Element
      start?: string
    } = {}
  ) => {
    if (prefersReducedMotion()) {
      gsap.set(elements, { opacity: 1, y: 0, scale: 1 })
      return
    }

    const {
      duration = 1,
      delay = 0,
      y = 60,
      stagger = 0,
      scale = 0.95,
      trigger,
      start = 'top 80%',
    } = options

    ctx?.add(() => {
      gsap.from(elements, {
        opacity: 0,
        y,
        scale,
        duration,
        delay,
        stagger,
        ease: 'power2.out',
        scrollTrigger: trigger
          ? {
              trigger: trigger,
              start,
              toggleActions: 'play none none none',
            }
          : undefined,
      })
    })
  }

  const staggerCards = (
    container: string | Element,
    cardSelector: string,
    options: {
      duration?: number
      stagger?: number
      y?: number
    } = {}
  ) => {
    if (prefersReducedMotion()) {
      gsap.set(`${container} ${cardSelector}`, { opacity: 1, y: 0 })
      return
    }

    const { duration = 0.8, stagger = 0.1, y = 50 } = options

    ctx?.add(() => {
      gsap.from(cardSelector, {
        opacity: 0,
        y,
        duration,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    })
  }

  const countUp = (
    element: string | Element,
    endValue: number,
    options: {
      duration?: number
      decimals?: number
      trigger?: string | Element
    } = {}
  ) => {
    const { duration = 2, decimals = 0, trigger } = options

    if (prefersReducedMotion()) {
      const el = typeof element === 'string' ? document.querySelector(element) : element
      if (el) el.textContent = endValue.toFixed(decimals)
      return
    }

    ctx?.add(() => {
      const obj = { value: 0 }
      gsap.to(obj, {
        value: endValue,
        duration,
        ease: 'power1.out',
        scrollTrigger: trigger
          ? {
              trigger,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          : undefined,
        onUpdate: () => {
          const el = typeof element === 'string' ? document.querySelector(element) : element
          if (el) el.textContent = obj.value.toFixed(decimals)
        },
      })
    })
  }

  const floatingAnimation = (
    element: string | Element,
    options: {
      y?: number
      duration?: number
      delay?: number
    } = {}
  ) => {
    if (prefersReducedMotion()) return

    const { y = 15, duration = 3, delay = 0 } = options

    ctx?.add(() => {
      gsap.to(element, {
        y: -y,
        duration,
        delay,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    })
  }

  const parallax = (
    element: string | Element,
    options: {
      y?: number
      trigger?: string | Element
    } = {}
  ) => {
    if (prefersReducedMotion()) return

    const { y = 100, trigger } = options

    ctx?.add(() => {
      gsap.to(element, {
        y,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger ?? element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  }

  onUnmounted(() => {
    ctx?.revert()
  })

  return {
    initContext,
    fadeUp,
    staggerCards,
    countUp,
    floatingAnimation,
    parallax,
  }
}
