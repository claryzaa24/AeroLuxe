<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { membershipTiers } from '@/data/membership'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import MembershipCard from './MembershipCard.vue'
import CtaBanner from './CtaBanner.vue'

const sectionRef = ref<HTMLElement | null>(null)
const { initContext, staggerCards } = useScrollAnimation()

onMounted(() => {
  if (sectionRef.value) {
    initContext(sectionRef.value)
    staggerCards(sectionRef.value, '.membership-card', {
      stagger: 0.12,
      y: 50,
    })
  }
})
</script>

<template>
  <section
    id="membership"
    ref="sectionRef"
    class="relative bg-[#0B132B] text-white pt-12 sm:pt-20 pb-0 overflow-hidden"
    aria-label="Program membership"
  >
    <!-- Kurva Putih Cembung di Bagian Atas -->
    <div class="absolute top-0 inset-x-0 overflow-hidden leading-none z-10 pointer-events-none">
      <svg
        class="relative block w-full h-16 sm:h-28 lg:h-36 text-white"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L1440,0 L1440,30 C960,110 480,110 0,30 Z"
          fill="currentColor"
        />
      </svg>
    </div>

    <!-- Ambient Glow Background -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-500/10 rounded-full blur-[140px] pointer-events-none"></div>

    <!-- 1. Kontainer untuk Judul dan Kartu Membership (Tetap dibatasi max-w-7xl agar rapi di tengah) -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-16 sm:pt-24">
      
      <div class="text-center space-y-3 mb-12 sm:mb-16">
        <div>
          <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-electric-300 bg-electric-500/10 border border-electric-500/20 shadow-sm">
            Membership
          </span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
          Pilih Tier Loyalty Anda
        </h2>
        <p class="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-normal">
          Dapatkan benefit eksklusif dan hak istimewa setiap kali Anda terbang bersama AeroLuxe.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-16 sm:mb-20 items-start">
        <MembershipCard
          v-for="(tier, index) in membershipTiers"
          :key="tier.name"
          :tier="tier"
          :index="index"
        />
      </div>

    </div>

    <!-- 2. CtaBanner Dikeluarkan dari pembatas max-w-7xl dan diberi padding horizontal yang aman (px-4 sm:px-6 lg:px-8) agar bisa merenggang lebar ke samping -->
    <div class="relative z-20 w-full px-4 sm:px-6 lg:px-8 max-w-[1900px] mx-auto mb-16">
      <CtaBanner />
    </div>

    <div class="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-[#0B132B] pointer-events-none z-10"></div>

  </section>
</template>