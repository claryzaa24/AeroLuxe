<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { testimonials, galleryImages } from '@/data/testimonials'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import type { Testimonial } from '@/types'
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const isAutoPlaying = ref(true)
let autoPlayInterval: ReturnType<typeof setInterval> | null = null

const { initContext } = useScrollAnimation()

const visibleTestimonials = ref<Testimonial[]>(testimonials.slice(0, 3))

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % Math.ceil(testimonials.length / 3)
  const start = currentIndex.value * 3
  visibleTestimonials.value = testimonials.slice(start, start + 3)
}

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0
      ? Math.ceil(testimonials.length / 3) - 1
      : currentIndex.value - 1
  const start = currentIndex.value * 3
  visibleTestimonials.value = testimonials.slice(start, start + 3)
}

const goToSlide = (index: number) => {
  currentIndex.value = index
  const start = index * 3
  visibleTestimonials.value = testimonials.slice(start, start + 3)
}

const startAutoPlay = () => {
  if (autoPlayInterval) clearInterval(autoPlayInterval)
  autoPlayInterval = setInterval(() => {
    if (isAutoPlaying.value) nextSlide()
  }, 5000)
}

onMounted(() => {
  if (sectionRef.value) {
    initContext(sectionRef.value)
    
    // Animasi GSAP ScrollTrigger untuk memunculkan gambar galeri secara stagger saat discroll
    const images = sectionRef.value.querySelectorAll('.gallery-img-wrapper')
    if (images.length > 0) {
      gsap.fromTo(
        images,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Animasi scroll untuk kartu testimoni
    const cards = sectionRef.value.querySelectorAll('.testimonial-card')
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }
  startAutoPlay()
})

onUnmounted(() => {
  if (autoPlayInterval) clearInterval(autoPlayInterval)
})

const totalDots = Math.ceil(testimonials.length / 3)
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-24 bg-white relative overflow-hidden"
    aria-label="Testimoni penumpang"
    @mouseenter="isAutoPlaying = false"
    @mouseleave="isAutoPlaying = true"
  >
    <!-- GALERI: container lebar sendiri, hampir full-width -->
    <div class="w-full max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8 mb-16 relative z-10">
      <div class="grid grid-cols-8 gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 items-start">

        <!-- Kolom 1 -->
        <div class="flex flex-col gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 mt-[36%]">
          <div class="gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
            <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <img :src="galleryImages.col1_1" class="w-full aspect-[91/128] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1" alt="Traveler 1" />
          </div>
          <div class="gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
            <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <img :src="galleryImages.col1_2" class="w-full aspect-[91/128] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1" alt="Traveler 2" />
          </div>
        </div>

        <!-- Kolom 2 -->
        <div class="flex flex-col gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 mt-[17%]">
          <div class="gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
            <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <img :src="galleryImages.col2_1" class="w-full aspect-[91/93] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1" alt="Traveler 3" />
          </div>
          <div class="gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
            <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <img :src="galleryImages.col2_2" class="w-full aspect-[91/93] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1" alt="Traveler 4" />
          </div>
          <div class="gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
            <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <img :src="galleryImages.col2_3" class="w-full aspect-[91/93] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1" alt="Traveler 5" />
          </div>
        </div>

        <!-- Kelompok tengah (kolom 3-6) + judul -->
        <div class="col-span-4 flex flex-col">
          <div class="grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 items-start">
            <div class="mt-[36%] gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
              <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
              <img :src="galleryImages.col3_1" class="w-full aspect-[91/200] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1" alt="Traveler 6" />
            </div>
            <div class="gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
              <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
              <img :src="galleryImages.col4_1" class="w-full aspect-[91/200] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1" alt="Traveler 7" />
            </div>
            <div class="gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
              <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
              <img :src="galleryImages.col5_1" class="w-full aspect-[91/200] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1" alt="Traveler 8" />
            </div>
            <div class="mt-[36%] gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
              <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
              <img :src="galleryImages.col6_1" class="w-full aspect-[91/200] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1" alt="Traveler 9" />
            </div>
          </div>

          <!-- Judul -->
          <div class="text-center pt-3 sm:pt-6 space-y-1.5 sm:space-y-3">
            <div>
              <span class="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-700 bg-white border border-gray-300 shadow-2xs transition-transform duration-300 hover:scale-105 cursor-pointer">
                Testimoni
              </span>
            </div>
            <h2 class="text-sm sm:text-xl md:text-3xl lg:text-4xl font-heading font-bold text-gray-900 tracking-tight leading-tight">
              Dipercaya Oleh Penumpang & Traveler
            </h2>
            <p class="text-gray-400 text-[10px] sm:text-sm md:text-lg lg:text-2xl font-semibold leading-tight">
              Dari berbagai latar belakang & penjuru dunia
            </p>
          </div>
        </div>

        <!-- Kolom 7 -->
        <div class="flex flex-col gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 mt-[17%]">
          <div class="gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
            <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <img :src="galleryImages.col7_1" class="w-full aspect-[91/93] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1" alt="Traveler 10" />
          </div>
          <div class="gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
            <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <img :src="galleryImages.col7_2" class="w-full aspect-[91/93] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1" alt="Traveler 11" />
          </div>
          <div class="gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
            <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <img :src="galleryImages.col7_3" class="w-full aspect-[91/93] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1" alt="Traveler 12" />
          </div>
        </div>

        <!-- Kolom 8 -->
        <div class="flex flex-col gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 mt-[36%]">
          <div class="gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
            <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <img :src="galleryImages.col8_1" class="w-full aspect-[91/128] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1" alt="Traveler 13" />
          </div>
          <div class="gallery-img-wrapper relative overflow-hidden rounded-lg shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
            <div class="absolute inset-0 bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <img :src="galleryImages.col8_2" class="w-full aspect-[91/128] object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1" alt="Traveler 14" />
          </div>
        </div>

      </div>
    </div>

    <!-- KARTU TESTIMONI + DOTS -->
    <div class="w-full max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
      <div class="md:min-h-[190px] md:px-4 lg:px-6">
        <Transition name="testimonial-swap" mode="out-in">
          <div
            :key="currentIndex"
            class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14"
          >
            <!-- Kartu Testimoni dengan Efek Hover Lebih Interaktif -->
            <article
              v-for="testimonial in visibleTestimonials"
              :key="testimonial.id"
              class="testimonial-card flex flex-col justify-between space-y-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2.5 hover:border-indigo-500/30 transition-all duration-500 cursor-pointer group"
            >
              <div class="flex gap-1">
                <svg
                  v-for="n in 5"
                  :key="n"
                  class="w-4 h-4 transition-transform duration-300 group-hover:scale-125"
                  :class="n <= testimonial.rating ? 'text-amber-400' : 'text-gray-200'"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>

              <p class="text-gray-600 text-sm sm:text-base leading-relaxed font-normal group-hover:text-gray-900 transition-colors duration-300">
                "{{ testimonial.quote }}"
              </p>

              <div class="flex items-center gap-3 pt-2">
                <img
                  :src="testimonial.avatar"
                  :alt="testimonial.name"
                  class="w-10 h-10 rounded-full object-cover border-2 border-gray-100 group-hover:border-indigo-500 group-hover:scale-105 transition-all duration-300 shadow-xs"
                  loading="lazy"
                />
                <div>
                  <p class="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">{{ testimonial.name }}</p>
                  <p class="text-xs text-gray-400 font-medium">{{ testimonial.role }}</p>
                </div>
              </div>
            </article>
          </div>
        </Transition>
      </div>

      <div class="flex items-center justify-center gap-2 mt-10">
        <button
          v-for="i in totalDots"
          :key="i"
          @click="goToSlide(i - 1)"
          class="h-2 rounded-full transition-all duration-300 cursor-pointer"
          :class="currentIndex === i - 1 ? 'bg-gray-900 w-6' : 'bg-gray-200 hover:bg-gray-400 w-2'"
          :aria-label="`Halaman testimoni ${i}`"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-swap-enter-active,
.testimonial-swap-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.testimonial-swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.testimonial-swap-leave-to {
  opacity: 0;
}
</style>