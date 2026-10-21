<script setup lang="ts">
import type { FloatingCardData } from '@/types'

interface Props {
  data: FloatingCardData
  delay?: number
}

withDefaults(defineProps<Props>(), {
  delay: 0,
})
</script>

<template>
  <div
    class="glass rounded-2xl p-4 sm:p-5 max-w-[220px] sm:max-w-[260px] select-none"
    :class="[`floating-card-${delay}`]"
  >
    <!-- Award type -->
    <template v-if="data.type === 'award'">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-lg">🏆</span>
        <span class="text-xs font-semibold text-electric-300 uppercase tracking-wider">Award</span>
      </div>
      <p class="text-white text-sm font-heading font-semibold leading-tight">
        {{ data.title }}
      </p>
    </template>

    <!-- Deal type -->
    <template v-else-if="data.type === 'deal'">
      <div class="flex items-center gap-2 mb-2">
        <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        <span class="text-xs font-medium text-green-400">Best Deal Found</span>
      </div>
      <p class="text-white/60 text-xs mb-1">{{ data.subtitle }}</p>
      <p class="text-white text-xl font-heading font-bold">
        {{ data.title }}
      </p>
      <p class="text-electric-300 text-xs mt-1">{{ data.value }}</p>
    </template>

    <!-- Loyalty type -->
    <template v-else-if="data.type === 'loyalty'">
      <div class="flex items-center gap-2 mb-2">
        <svg class="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
        <span class="text-xs font-medium text-white/60">{{ data.subtitle }}</span>
      </div>
      <p class="text-white text-2xl font-heading font-bold text-gradient">
        {{ data.value }}
      </p>
      <p class="text-white/50 text-xs mt-1">{{ data.title }}</p>
    </template>

    <!-- Rating type -->
    <template v-else-if="data.type === 'rating'">
      <div class="flex items-center gap-1 mb-2">
        <svg v-for="n in 5" :key="n" class="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      </div>
      <p class="text-white text-lg font-heading font-bold">{{ data.value }}</p>
      <p class="text-white/50 text-xs">{{ data.title }}</p>
    </template>
  </div>
</template>
