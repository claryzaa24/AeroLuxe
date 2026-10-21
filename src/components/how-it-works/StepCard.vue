<script setup lang="ts">
import { ref } from 'vue'
import type { Step } from '@/types'

interface Props {
  step: Step
  index: number
  total: number
}

defineProps<Props>()

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
  <div class="step-card relative">
    <!-- Main Card Clickable -->
    <article
      @click="openModal"
      class="relative z-10 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-electric-500/40 hover:shadow-lg hover:shadow-electric-500/10 active:scale-[0.98] transition-all duration-300 group cursor-pointer"
    >
      <!-- Step Number & Icon -->
      <div class="flex items-start justify-between mb-6">
        <span class="text-5xl sm:text-6xl font-heading font-bold text-electric-500/20 group-hover:text-electric-500/40 leading-none select-none transition-colors">
          {{ step.number }}
        </span>
        <div
          class="w-12 h-12 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center text-electric-400 group-hover:bg-electric-500 group-hover:text-white group-hover:scale-110 transition-all duration-300"
          v-html="step.icon"
        ></div>
      </div>

      <!-- Content -->
      <h3 class="text-xl font-heading font-semibold text-white mb-3 group-hover:text-electric-400 transition-colors">
        {{ step.title }}
      </h3>
      <p class="text-white/50 text-sm leading-relaxed mb-4">
        {{ step.description }}
      </p>

      <!-- Click Hint Indicator -->
      <div class="inline-flex items-center gap-1.5 text-xs text-electric-400 font-medium group-hover:translate-x-1 transition-transform">
        <span>Lihat Detail</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </article>

    <!-- Connector line -->
    <div
      v-if="index < total - 1"
      class="hidden lg:block absolute top-1/2 -right-6 w-12 h-px z-0"
    >
      <div class="w-full h-full bg-gradient-to-r from-electric-500/30 to-transparent"></div>
      <div class="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-electric-500/30"></div>
    </div>

    <!-- Modal Detail Pop-Up -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          @click.self="closeModal"
        >
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4"
          >
            <div
              v-if="isModalOpen"
              class="relative w-full max-w-lg bg-0b0f19 bg-gradient-to-b from-gray-900 to-black border border-white-15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-white"
            >
              <!-- Close Button -->
              <button
                @click="closeModal"
                class="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- Modal Header -->
              <div class="flex items-center gap-4 mb-5">
                <div
                  class="w-12 h-12 rounded-2xl bg-electric-500/20 border border-electric-500/30 flex items-center justify-center text-electric-400 shrink-0"
                  v-html="step.icon"
                ></div>
                <div>
                  <span class="text-xs font-semibold tracking-wider text-electric-400 uppercase">Langkah {{ step.number }}</span>
                  <h3 class="text-xl font-heading font-bold text-white">{{ step.title }}</h3>
                </div>
              </div>

              <!-- Main Description -->
              <p class="text-white/70 text-sm leading-relaxed mb-6 border-b border-white/10 pb-4">
                {{ step.description }}
              </p>

              <!-- Extended Details -->
              <div v-if="step.details" class="space-y-3">
                <h4 class="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-electric-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  {{ step.details.subtitle }}
                </h4>
                <ul class="space-y-2 pl-2">
                  <li
                    v-for="(feature, idx) in step.details.features"
                    :key="idx"
                    class="text-xs sm:text-sm text-white/60 flex items-start gap-2.5"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-electric-400 mt-2 shrink-0"></span>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <!-- Modal Footer -->
              <div class="mt-8 pt-4 border-t border-white/10 flex justify-end">
                <button
                  @click="closeModal"
                  class="px-5 py-2.5 rounded-xl bg-electric-500 hover:bg-electric-600 text-white text-xs font-semibold transition-colors"
                >
                  Mengerti
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>