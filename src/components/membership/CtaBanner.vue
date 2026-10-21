<script setup lang="ts">
import { useSmoothScroll } from '@/composables/useSmoothScroll'

const { scrollTo } = useSmoothScroll()
</script>

<template>
  <!-- Lebar dibuat w-full penuh tanpa margin samping -->
  <div class="relative overflow-hidden rounded-3xl w-full isolate">
    <!-- Background CTA Banner -->
    <div class="bg-gradient-cta bg-[length:200%_200%] animate-gradient-shift py-16 sm:py-20 px-8 sm:px-16 relative w-full">
      <!-- Decorative elements -->
      <div class="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-60 h-60 bg-electric-300/10 rounded-full blur-[60px] pointer-events-none"></div>

      <!-- Grid pattern -->
      <div class="absolute inset-0 opacity-5 pointer-events-none" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 40px 40px;"></div>

      <!-- KONTEN: Diperlebar dari max-w-3xl menjadi max-w-5xl agar teks & tombol merenggang ke samping -->
      <div class="relative z-10 max-w-5xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-5 leading-tight">
          Mulai Perjalanan Anda
          Bersama <span class="text-gradient-gold">AeroLuxe</span>
        </h2>
        <p class="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
          Bergabunglah dengan jutaan penumpang yang mempercayakan perjalanan mereka kepada maskapai #1 dunia.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            @click="scrollTo('#hero')"
            class="px-8 py-4 bg-white text-navy-900 rounded-full font-heading font-bold text-base hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 cursor-pointer"
            aria-label="Pesan tiket sekarang"
          >
            Pesan Sekarang
            <svg class="w-5 h-5 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
          <button
            @click="scrollTo('#features')"
            class="px-8 py-4 border-2 border-white/30 text-white rounded-full font-heading font-semibold text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300 cursor-pointer"
            aria-label="Pelajari lebih lanjut"
          >
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>

    </div>
  </div>
</template>