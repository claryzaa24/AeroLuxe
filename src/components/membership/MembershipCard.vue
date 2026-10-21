<script setup lang="ts">
import type { MembershipTier } from '@/types'

interface Props {
  tier: MembershipTier
  index: number
}

defineProps<Props>()
</script>

<template>
  <article
    class="membership-card relative rounded-2xl p-7 sm:p-8 transition-all duration-300"
    :class="
      tier.highlighted
        ? 'bg-navy-900 text-white border-2 border-gold-500/50 shadow-[0_0_40px_rgba(212,175,55,0.15)] scale-105 z-10'
        : 'bg-white border border-gray-100 shadow-card hover:shadow-card-hover hover-lift'
    "
  >
    <!-- Badge -->
    <div
      v-if="tier.badge"
      class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 text-xs font-bold whitespace-nowrap shadow-lg"
    >
      {{ tier.badge }}
    </div>

    <!-- Tier Name -->
    <h3
      class="text-lg font-heading font-bold mb-2"
      :class="tier.highlighted ? 'text-gradient-gold' : 'text-text-dark'"
    >
      {{ tier.name }}
    </h3>

    <!-- Price -->
    <div class="flex items-baseline gap-1 mb-6">
      <span
        class="text-4xl font-heading font-bold"
        :class="tier.highlighted ? 'text-white' : 'text-text-dark'"
      >
        {{ tier.price }}
      </span>
      <span
        class="text-sm"
        :class="tier.highlighted ? 'text-white/50' : 'text-text-muted'"
      >
        {{ tier.period }}
      </span>
    </div>

    <!-- Divider -->
    <div
      class="h-px mb-6"
      :class="tier.highlighted ? 'bg-white/10' : 'bg-gray-100'"
    ></div>

    <!-- Benefits -->
    <ul class="space-y-3 mb-8">
      <li
        v-for="benefit in tier.benefits"
        :key="benefit"
        class="flex items-start gap-3 text-sm"
      >
        <svg
          class="w-5 h-5 shrink-0 mt-0.5"
          :class="tier.highlighted ? 'text-gold-400' : 'text-electric-500'"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        <span :class="tier.highlighted ? 'text-white/80' : 'text-text-muted'">
          {{ benefit }}
        </span>
      </li>
    </ul>

    <!-- CTA Button -->
    <button
      class="w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer"
      :class="
        tier.highlighted
          ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105'
          : 'border-2 border-electric-500 text-electric-500 hover:bg-electric-500 hover:text-white'
      "
    >
      Pilih {{ tier.name }}
    </button>
  </article>
</template>
