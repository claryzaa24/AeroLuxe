<script setup lang="ts">
import type { Destination } from '@/types'

interface Props {
  destination: Destination
}

defineProps<Props>()

// Emit event ke parent component saat kartu diklik
defineEmits<{
  (e: 'select', destination: Destination): void
}>()
</script>

<template>
  <article 
    @click="$emit('select', destination)"
    class="destination-card group relative rounded-2xl overflow-hidden cursor-pointer border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-electric-500/60 transition-all duration-300 transform hover:scale-[1.02]"
  >
    <!-- Image Container -->
    <div class="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
      <img
        :src="destination.image"
        :alt="`Destinasi penerbangan ${destination.name}, ${destination.country}`"
        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />

      <!-- Dark Gradient Overlay untuk Keterbacaan Teks -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-85 transition-opacity duration-300"></div>

      <!-- Floating Action Button (Top Right) -->
      <div class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-electric-500 text-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>

      <!-- Content Container -->
      <div class="absolute bottom-0 left-0 right-0 p-5 z-10 space-y-2">
        <!-- Country Info -->
        <div class="flex items-center gap-1.5 text-electric-300 text-xs font-semibold tracking-wide drop-shadow-md">
          <svg class="w-3.5 h-3.5 shrink-0 filter drop-shadow" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <span class="uppercase tracking-wider text-[11px] font-bold text-electric-300 drop-shadow-md">
            {{ destination.country }}
          </span>
        </div>

        <!-- Destination Title -->
        <h3 class="text-xl sm:text-2xl font-heading font-bold text-white group-hover:text-electric-200 transition-colors duration-300 leading-tight drop-shadow-md">
          {{ destination.name }}
        </h3>

        <!-- Price Section -->
        <div class="pt-2 flex items-center justify-between border-t border-white/20 group-hover:border-electric-500/40 transition-colors duration-300">
          <div>
            <span class="block text-[10px] text-gray-200 uppercase tracking-wider font-semibold drop-shadow-md">Mulai dari</span>
            <div class="text-lg font-bold text-white group-hover:text-electric-300 transition-colors drop-shadow-md">
              ${{ destination.price }}
              <span class="text-xs font-normal text-gray-300">/ pax</span>
            </div>
          </div>

          <span class="text-xs font-semibold text-white group-hover:text-electric-300 flex items-center gap-1 transition-all group-hover:translate-x-1 drop-shadow-md">
            Pesan
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </article>
</template>