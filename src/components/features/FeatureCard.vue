<script setup lang="ts">
import type { Feature } from '@/types'

interface Props {
  feature: Feature
  index: number
  isExpanded?: boolean
}

defineProps<Props>()
defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <article
    @click="$emit('toggle')"
    class="feature-card group relative overflow-hidden rounded-2xl p-5 sm:p-6 text-text-dark border cursor-pointer transition-all duration-500 ease-in-out shrink-0 flex flex-col justify-between h-[250px] sm:h-[250px]"
    :class="[
      isExpanded 
        ? 'w-[420px] sm:w-[480px] bg-electric-500 text-white border-electric-500 shadow-glow' 
        : 'w-[220px] sm:w-[250px] bg-white hover:border-electric-500 hover:shadow-card border-gray-100'
    ]"
  >
    <!-- Background Layer Biru Hover -->
    <div
      class="absolute inset-0 bg-electric-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
      :class="{ '!opacity-100': isExpanded }"
    ></div>

    <!-- Content Wrapper Top (Icon + Title + Description) -->
    <div class="relative z-10 w-full overflow-hidden">
      <!-- Icon -->
      <div
        class="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-500 ease-out shrink-0"
        :class="[
          isExpanded 
            ? 'bg-white/20 text-white' 
            : 'bg-electric-50 text-electric-500 group-hover:bg-white/20 group-hover:text-white'
        ]"
        v-html="feature.icon"
      ></div>

      <!-- Layout Berdampingan: Judul & Deskripsi -->
      <div class="flex gap-4 items-start w-full">
        <!-- Title (Panjang Dikunci Agar Tidak Pindah Baris) -->
        <h3
          class="text-base font-heading font-semibold leading-snug transition-colors duration-500 ease-out shrink-0 w-[130px] sm:w-[150px]"
          :class="[
            isExpanded ? 'text-white' : 'text-text-dark group-hover:text-white'
          ]"
        >
          {{ feature.title }}
        </h3>

        <!-- Description (Samping Kanan) -->
        <transition
          enter-active-class="transition-all duration-500 ease-out delay-100"
          enter-from-class="opacity-0 -translate-x-3 scale-95"
          enter-to-class="opacity-100 translate-x-0 scale-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-x-0 scale-100"
          leave-to-class="opacity-0 -translate-x-3 scale-95"
        >
          <p
            v-if="isExpanded"
            class="text-xs sm:text-sm leading-relaxed text-white/90 border-l border-white/20 pl-3 flex-1 line-clamp-4"
          >
            {{ feature.description }}
          </p>
        </transition>
      </div>
    </div>

    <!-- Action Link (Posisi Dikunci di Bawah) -->
    <div
      class="relative z-10 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition-colors duration-500 ease-out shrink-0 h-6"
      :class="[
        isExpanded ? 'text-white' : 'text-electric-500 group-hover:text-white'
      ]"
    >
      <!-- Transisi Teks Tempat Sama -->
      <transition
        mode="out-in"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-x-2"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-2"
      >
        <span :key="isExpanded ? 'tutup' : 'selengkapnya'" class="inline-block whitespace-nowrap">
          {{ isExpanded ? 'Tutup' : 'Selengkapnya' }}
        </span>
      </transition>

      <!-- Panah -->
      <svg
        class="w-4 h-4 transition-all duration-500 ease-out transform shrink-0"
        :class="[
          isExpanded 
            ? 'rotate-180 translate-x-1' 
            : 'group-hover:translate-x-1.5 rotate-0'
        ]"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </div>

    <!-- Shimmer Effect -->
    <div class="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-20">
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
        <div
          class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
          style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
        ></div>
      </div>
    </div>
  </article>
</template>