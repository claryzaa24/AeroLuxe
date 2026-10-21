<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { steps } from '@/data/steps'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import SectionTitle from '@/components/common/SectionTitle.vue'
import StepCard from './StepCard.vue'
import PhoneMockup from './PhoneMockup.vue'

const sectionRef = ref<HTMLElement | null>(null)
const { initContext, staggerCards, fadeUp } = useScrollAnimation()

onMounted(() => {
  if (sectionRef.value) {
    initContext(sectionRef.value)
    staggerCards(sectionRef.value, '.step-card', {
      stagger: 0.12,
      y: 50,
    })
    fadeUp('.phone-mockup-wrapper', {
      duration: 1.2,
      y: 80,
      scale: 0.9,
      trigger: sectionRef.value,
      start: 'top 60%',
    })
  }
})
</script>

<template>
  <!-- PENTING: overflow-hidden dihapus dari section agar sticky CSS berfungsi -->
  <section
    id="how-it-works"
    ref="sectionRef"
    class="py-20 sm:py-28 bg-gradient-dark relative"
    aria-label="Cara kerja pemesanan"
  >
    <!-- Faint wordmark background -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <span class="text-[10rem] sm:text-[16rem] md:text-[20rem] font-heading font-extrabold text-white/[0.02] whitespace-nowrap leading-none tracking-tighter">
        PROCESS
      </span>
    </div>

    <!-- Decorative blobs -->
    <div class="absolute top-1/3 -right-20 w-64 h-64 bg-electric-500/8 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionTitle
        label="Cara Kerja"
        title="Pesan Dalam 3 Langkah Mudah"
        subtitle="Proses pemesanan yang simpel dan intuitif dari pencarian hingga boarding pass digital."
        :dark="true"
      />

      <!-- PERUBAHAN: items-center diubah ke items-start agar kolom kanan sejarak dengan bagian atas -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        <!-- Steps Container -->
        <div class="grid grid-cols-1 gap-5 sm:gap-6">
          <div
            v-for="(step, index) in steps"
            :key="step.number"
            :class="[
              'transition-all duration-300',
              // Indeks 0 (Card Atas): Geser agak ke kanan
              index === 0 ? 'lg:translate-x-26 md:translate-x-4' : '',
              // Indeks 1 (Card Tengah): Tetap di tempat (0 offset)
              index === 1 ? 'translate-x-0' : '',
              // Indeks 2 (Card Bawah): Geser agak ke kanan
              index === 2 ? 'lg:translate-x-28 md:translate-x-4' : ''
            ]"
          >
            <StepCard
              :step="step"
              :index="index"
              :total="steps.length"
            />
          </div>
        </div>

        <!-- Phone Mockup Wrapper -->
        <!-- PERUBAHAN: Ditambahkan 'lg:pl-8' / 'lg:translate-x-6' untuk mendorong area HP lebih ke kanan -->
        <div class="phone-mockup-wrapper flex flex-col items-center gap-8 lg:pl-8 lg:translate-x-6">
          <PhoneMockup />
        </div>

      </div>
    </div>
  </section>
</template>