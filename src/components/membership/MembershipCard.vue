<script setup lang="ts">
import { ref } from 'vue'
import type { MembershipTier } from '@/types'

interface Props {
  tier: MembershipTier
  index: number
}

defineProps<Props>()

// Menggunakan state interaktif agar transisi stabil saat hover maupun tap/klik
const isHovered = ref(false)
</script>

<template>
  <article
    class="membership-card group relative flex flex-col rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] cursor-pointer"
    :class="
      tier.highlighted
        ? 'bg-gradient-to-b from-navy-900 via-navy-900 to-navy-950 text-white border-2 border-gold-500/65 shadow-[0_20px_50px_rgba(212,175,55,0.2)] hover:shadow-[0_25px_60px_rgba(212,175,55,0.45)] lg:-translate-y-4 z-10'
        : 'bg-white/80 backdrop-blur-xl border border-gray-100/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,112,243,0.15)] hover:border-electric-500/40'
    "
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="isHovered = !isHovered"
  >
    <!-- Badge -->
    <div
      v-if="tier.badge"
      class="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_auto] animate-shimmer text-navy-900 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
    >
      {{ tier.badge }}
    </div>

    <!-- Tier Name & Description Header -->
    <div class="mb-4">
      <h3
        class="text-xl font-heading font-bold tracking-tight mb-1 transition-colors duration-300"
        :class="tier.highlighted ? 'text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200' : 'text-text-dark group-hover:text-electric-600'"
      >
        {{ tier.name }}
      </h3>
      <p class="text-xs" :class="tier.highlighted ? 'text-white/60' : 'text-text-muted'">
        Pilihan terbaik untuk meningkatkan level Anda
      </p>
    </div>

    <!-- Price Section (Selalu Tampil) -->
    <div class="flex items-baseline gap-1.5 mb-2">
      <span
        class="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight transition-transform duration-300 group-hover:scale-105 origin-left"
        :class="tier.highlighted ? 'text-white' : 'text-text-dark'"
      >
        {{ tier.price }}
      </span>
      <span
        class="text-sm font-medium"
        :class="tier.highlighted ? 'text-white/50' : 'text-text-muted'"
      >
        / {{ tier.period }}
      </span>
    </div>

    <!-- Collapsible Content menggunakan Vue Transition -->
    <Transition name="expand">
      <div v-show="isHovered" class="overflow-hidden">
        <!-- Animated Divider -->
        <div
          class="h-px w-full my-6 transition-colors duration-300"
          :class="tier.highlighted ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'"
        ></div>

        <!-- Benefits List -->
        <ul class="space-y-4 mb-8">
          <li
            v-for="benefit in tier.benefits"
            :key="benefit"
            class="flex items-start gap-3.5 text-sm group/item transition-transform duration-300 hover:translate-x-1"
          >
            <div
              class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300"
              :class="
                tier.highlighted
                  ? 'bg-gold-500/20 text-gold-400 group-hover/item:bg-gold-500 group-hover/item:text-navy-900'
                  : 'bg-electric-500/10 text-electric-500 group-hover/item:bg-electric-500 group-hover/item:text-white'
              "
            >
              <svg
                class="w-3.5 h-3.5 stroke-[3]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <span 
              class="font-medium leading-relaxed transition-colors duration-300"
              :class="tier.highlighted ? 'text-white/80 group-hover/item:text-white' : 'text-text-muted group-hover/item:text-text-dark'"
            >
              {{ benefit }}
            </span>
          </li>
        </ul>

        <!-- Modern CTA Button -->
        <button
          class="relative w-full py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide overflow-hidden transition-all duration-300 cursor-pointer active:scale-95 shadow-md"
          :class="
            tier.highlighted
              ? 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_auto] text-navy-900 hover:bg-[position:right_center] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)]'
              : 'bg-gray-900 text-white hover:bg-electric-600 hover:shadow-[0_10px_25px_rgba(0,112,243,0.3)]'
          "
        >
          <span class="relative z-10 flex items-center justify-center gap-2">
            Pilih {{ tier.name }}
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </button>
      </div>
    </Transition>
  </article>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s ease-in-out;
  max-height: 400px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  margin-bottom: 0;
}
</style>