<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats } from '@/data/stats'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
// Inisialisasi awal nilai angka mulai dari "1"
const statValues = ref<string[]>(stats.map(() => '1'))
const hasAnimated = ref(false)

onMounted(() => {
  if (!sectionRef.value) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    statValues.value = stats.map((stat) => {
      return Number.isInteger(stat.value) ? stat.value.toString() : stat.value.toFixed(1)
    })
    return
  }

  // Animasi menghitung angka & fade in kartu saat scroll masuk viewport
  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 85%', // Mulai saat bagian atas section mencapai 85% layar
    once: true,
    onEnter: () => {
      if (hasAnimated.value) return
      hasAnimated.value = true

      // 1. Animasi Fade In & Slide Up untuk setiap item statistik
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }
      )

      // 2. Animasi Menghitung Angka (dari 1 ke target value)
      stats.forEach((stat, index) => {
        // Mulai nilai awal dari 1
        const startVal = Math.min(1, stat.value)
        const obj = { value: startVal }
        const decimals = Number.isInteger(stat.value) ? 0 : 1

        gsap.to(obj, {
          value: stat.value,
          duration: 2.2,
          delay: index * 0.15,
          ease: 'power2.out',
          onUpdate: () => {
            // Memperbarui array reaktif secara presisi
            statValues.value[index] = obj.value.toFixed(decimals)
          },
        })
      })
    },
  })
})
</script>

<template>
  <div
    ref="sectionRef"
    class="py-14 sm:py-20 bg-gradient-dark relative overflow-hidden"
    aria-label="Statistik AeroLuxe"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="stat-item text-center group opacity-0"
        >
          <div class="inline-flex items-baseline gap-1 mb-2">
            <span v-if="stat.prefix" class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
              {{ stat.prefix }}
            </span>
            <span class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gradient tabular-nums">
              {{ statValues[index] }}
            </span>
            <span class="text-xl sm:text-2xl font-heading font-bold text-electric-400">
              {{ stat.suffix }}
            </span>
          </div>
          <p class="text-white/50 text-sm sm:text-base font-medium">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>

    <!-- Top and bottom border glow -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-500/30 to-transparent"></div>
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-500/30 to-transparent"></div>
  </div>
</template>