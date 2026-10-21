<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { navItems } from '@/data/navigation'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import BaseButton from '@/components/common/BaseButton.vue'

const { scrollTo } = useSmoothScroll()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('')

const updateActiveSection = () => {
  const sections = navItems.map(item => item.href.substring(1))
  let current = ''
  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      // Adjust offset based on your design
      if (rect.top <= 250 && rect.bottom >= 250) {
        current = id
        break
      }
    }
  }
  if (current !== activeSection.value) {
    activeSection.value = current
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  updateActiveSection()
}

const handleNavClick = (e: Event, href: string) => {
  e.preventDefault()
  isMobileMenuOpen.value = false
  scrollTo(href)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div 
    class="fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out flex justify-center pointer-events-none"
    :class="isScrolled ? 'pt-4 px-4' : 'pt-0 px-0'"
  >
    <nav
      class="pointer-events-auto w-full transition-all duration-500 ease-out"
      :class="
        isScrolled
          ? 'max-w-6xl bg-[#03071E]/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 py-3 px-6 lg:px-8 rounded-full'
          : 'max-w-full bg-transparent py-6 px-6 lg:px-12 rounded-none'
      "
      aria-label="Navigasi utama"
    >
      <div class="flex items-center justify-between w-full">
        <!-- Logo -->
        <a
          href="#hero"
          class="flex items-center gap-3 group shrink-0"
          @click.prevent="scrollTo('#hero')"
          aria-label="AeroLuxe - Kembali ke beranda"
        >
          <div class="relative">
            <svg
              class="w-10 h-10 text-[#3B5BFF] group-hover:text-[#6B85FF] transition-colors duration-300"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 4L36 32H4L20 4Z"
                fill="currentColor"
                opacity="0.2"
              />
              <path
                d="M8 30L20 8L32 30"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 22H26"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <circle cx="20" cy="16" r="2" fill="currentColor" />
            </svg>
          </div>
          <div class="flex flex-col justify-center">
            <span class="text-2xl font-display font-bold text-white tracking-tight leading-none">
              Aero<span class="text-[#3B5BFF]">Luxe</span>
            </span>
            <span class="hidden sm:block text-[10px] text-white/50 font-medium tracking-[0.2em] uppercase mt-0.5">
              Airlines
            </span>
          </div>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center justify-center flex-1 gap-2 mx-8">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="relative px-5 py-2 text-[15px] font-medium transition-all duration-300 group overflow-hidden rounded-full"
            :class="activeSection === item.href.substring(1) ? 'text-white' : 'text-white/70 hover:text-white'"
            @click="handleNavClick($event, item.href)"
          >
            <!-- Background hover pill -->
            <span class="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center"></span>
            
            <span class="relative z-10">{{ item.label }}</span>
            
            <!-- Active/Hover Underline Indicator -->
            <span 
              class="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] rounded-t-full bg-[#3B5BFF] transition-all duration-300 ease-out"
              :class="activeSection === item.href.substring(1) ? 'w-4 opacity-100' : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-100'"
            ></span>
          </a>
        </div>

        <!-- Desktop Actions -->
        <div class="hidden lg:flex items-center gap-3 shrink-0">
          <!-- Favorite Icon -->
          <button class="p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer group hover:scale-105" aria-label="Favorite">
            <svg class="w-5 h-5 group-hover:fill-white/20 transition-all" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
          
          <!-- Cart Icon -->
          <button class="p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer group hover:scale-105 relative" aria-label="Cart">
            <svg class="w-5 h-5 group-hover:fill-white/20 transition-all" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#03071E]"></span>
          </button>

          <BaseButton
            size="md"
            class="ml-2 !rounded-full shadow-lg hover:shadow-[#3B5BFF]/30 transition-all duration-300 hover:-translate-y-0.5"
            @click="scrollTo('#hero')"
            aria-label="Pesan tiket penerbangan"
          >
            Pesan Tiket
            <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </BaseButton>
        </div>

        <!-- Mobile Hamburger -->
        <button
          class="lg:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          @click="toggleMobileMenu"
          :aria-label="isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'"
          :aria-expanded="isMobileMenuOpen"
        >
          <svg v-if="!isMobileMenuOpen" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg v-else class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>
  </div>

  <!-- Mobile Menu Dropdown -->
  <Transition
    enter-active-class="transition-all duration-400 ease-out"
    enter-from-class="opacity-0 -translate-y-8 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 -translate-y-8 scale-95"
  >
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-x-0 top-[88px] z-40 mx-4 lg:hidden bg-[#03071E]/90 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 rounded-3xl overflow-hidden"
    >
      <div class="px-4 py-6 space-y-1">
        <a
          v-for="(item, index) in navItems"
          :key="item.href"
          :href="item.href"
          class="mobile-menu-item block px-5 py-3.5 text-base font-medium rounded-2xl transition-all relative overflow-hidden"
          :class="activeSection === item.href.substring(1) ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'"
          :style="{ animationDelay: `${index * 60}ms` }"
          @click="handleNavClick($event, item.href)"
        >
          <span class="relative z-10 flex items-center justify-between">
            {{ item.label }}
            <span v-if="activeSection === item.href.substring(1)" class="w-1.5 h-1.5 rounded-full bg-[#3B5BFF]"></span>
          </span>
        </a>
        
        <div class="pt-5 mt-3 border-t border-white/10 space-y-4 px-1">
          <div class="flex items-center gap-4 px-4 pb-2">
            <!-- Mobile Action Icons -->
            <button class="mobile-menu-item flex-1 flex flex-col items-center gap-1.5 p-3 text-white/70 hover:text-white bg-white/5 rounded-2xl transition-all" style="animation-delay: 240ms;">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <span class="text-xs font-medium">Favorite</span>
            </button>
            <button class="mobile-menu-item flex-1 flex flex-col items-center gap-1.5 p-3 text-white/70 hover:text-white bg-white/5 rounded-2xl transition-all relative" style="animation-delay: 300ms;">
              <div class="relative">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <span class="text-xs font-medium">Cart</span>
            </button>
          </div>
          <BaseButton size="md" class="mobile-menu-item w-full !rounded-2xl" style="animation-delay: 360ms;">
            Pesan Tiket Sekarang
          </BaseButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes slideInFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.mobile-menu-item {
  opacity: 0;
  animation: slideInFromLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
