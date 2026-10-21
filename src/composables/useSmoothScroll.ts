import { ref, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export function useSmoothScroll() {
  const isReady = ref(false)

  const init = () => {
    isReady.value = true
  }

  const scrollTo = (target: string, options: { duration?: number; offset?: number } = {}) => {
    const { duration = 1.2, offset = -80 } = options

    gsap.to(window, {
      duration,
      scrollTo: {
        y: target,
        offsetY: Math.abs(offset),
      },
      ease: 'power2.inOut',
    })
  }

  onUnmounted(() => {
    isReady.value = false
  })

  return {
    isReady,
    init,
    scrollTo,
  }
}
