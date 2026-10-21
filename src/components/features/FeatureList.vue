<script setup lang="ts">
import { ref } from 'vue'
import FeatureCard from './FeatureCard.vue'
import type { Feature } from '@/types'

const props = withDefaults(
  defineProps<{
    features?: Feature[]
  }>(),
  {
    features: () => []
  }
)

const scrollContainer = ref<HTMLElement | null>(null)
const activeIndex = ref<number | null>(1) // Default aktif pada item ke-2
const currentPage = ref<number>(0)

const toggleExpand = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

// Navigasi presisi untuk 3 titik indikator
const scrollToPage = (pageIndex: number) => {
  if (scrollContainer.value) {
    currentPage.value = pageIndex
    const { scrollWidth, clientWidth } = scrollContainer.value
    const maxScroll = scrollWidth - clientWidth
    
    // Titik 0 = Awal (0px), Titik 1 = Tengah (50%), Titik 2 = Ujung Akhir (100%)
    const targetScroll = pageIndex === 0 
      ? 0 
      : pageIndex === 1 
        ? maxScroll / 2 
        : maxScroll

    scrollContainer.value.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }
}

// Sinkronisasi posisi indikator saat di-scroll manual
const handleScroll = () => {
  if (scrollContainer.value) {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
    const maxScroll = scrollWidth - clientWidth
    
    if (maxScroll <= 0) return

    const scrollRatio = scrollLeft / maxScroll
    if (scrollRatio < 0.3) {
      currentPage.value = 0
    } else if (scrollRatio < 0.7) {
      currentPage.value = 1
    } else {
      currentPage.value = 2
    }
  }
}
</script>

<template>
  <div class="w-full relative">
    <!-- Scroll Container dengan Masking Fade & Snap Smooth -->
    <div
      ref="scrollContainer"
      @scroll="handleScroll"
      class="w-full overflow-x-auto py-6 no-scrollbar scroll-smooth rounded-2xl smooth-mask"
    >
      <div class="flex flex-nowrap gap-5 items-stretch min-w-max px-6 sm:px-10">
        <FeatureCard
          v-for="(feature, index) in features"
          :key="feature.title || index"
          :feature="feature"
          :index="index"
          :is-expanded="activeIndex === index"
          @toggle="toggleExpand(index)"
        />
      </div>
    </div>

    <!-- 3 Titik Indikator -->
    <div v-if="features.length" class="flex items-center justify-center gap-2 mt-4">
      <button
        v-for="page in 3"
        :key="page"
        @click="scrollToPage(page - 1)"
        type="button"
        :aria-label="`Go to slide ${page}`"
        class="h-2.5 rounded-full transition-all duration-300 cursor-pointer"
        :class="[
          currentPage === (page - 1) 
            ? 'w-8 bg-electric-500' 
            : 'w-2.5 bg-gray-300 hover:bg-gray-400'
        ]"
      ></button>
    </div>
  </div>
</template>

<style scoped>
/* Menghilangkan Scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Masking Gradient untuk Efek Fade Halus di Pinggir Kiri & Kanan */
.smooth-mask {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 6%,
    black 94%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 6%,
    black 94%,
    transparent 100%
  );
}
</style>