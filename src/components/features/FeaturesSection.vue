<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { features } from '@/data/features'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import SectionTitle from '@/components/common/SectionTitle.vue'
import FeatureList from './FeatureList.vue'

const sectionRef = ref<HTMLElement | null>(null)
const { initContext } = useScrollAnimation()

onMounted(() => {
  if (sectionRef.value) {
    initContext(sectionRef.value)
  }
})
</script>

<template>
  <section
    id="features"
    ref="sectionRef"
    class="py-20 sm:py-28 bg-surface relative overflow-hidden"
    aria-label="Keunggulan AeroLuxe"
  >
    <!-- Decorative Glow -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-electric-500/5 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-electric-400/5 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionTitle
        label="Keunggulan Kami"
        title="Fasilitas Premium, Perjalanan Tanpa Kompromi"
        subtitle="Nikmati rangkaian layanan eksklusif yang dirancang untuk pengalaman terbang terbaik di kelasnya."
      />

      <div class="mt-8">
        <FeatureList :features="features" />
      </div>
    </div>
  </section>
</template>