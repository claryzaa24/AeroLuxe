<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import StackedCardCarousel from './StackedCardCarousel.vue'

const cardLeft = ref<HTMLElement | null>(null)
const cardCenter = ref<HTMLElement | null>(null)
const cardRight = ref<HTMLElement | null>(null)

// 1. TAMBAHKAN VARIABEL STATE DI SINI
const displayPoints = ref("0")

// 📍 TAMBAHAN BARU: Variabel state untuk kolom tengah
const scannedAirlines = ref(0)
const satisfactionRate = ref(0)
const circleProgress = ref(0)

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl
    .from('.hero-badge', { y: 16, opacity: 0, duration: 0.5 }, '-=0.25')
    .from('.hero-title-line', { y: 30, opacity: 0, duration: 0.6, stagger: 0.12 }, '-=0.2')
    .from('.hero-subtitle', { y: 16, opacity: 0, duration: 0.5 }, '-=0.3')
    .from('.hero-cta', { y: 16, opacity: 0, scale: 0.95, duration: 0.5 }, '-=0.3')
    .from(cardLeft.value, { y: 40, opacity: 0, duration: 0.7 }, '-=0.2')
    .from(cardCenter.value, { y: 60, opacity: 0, duration: 0.7 }, '-=0.55')
    .from(cardRight.value, { y: 40, opacity: 0, duration: 0.7 }, '-=0.55')
    .from('.hero-tag', { scale: 0, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.3')
    .from('.hero-floating-pill', { y: 25, opacity: 0, duration: 0.6, ease: 'back.out(1.2)', stagger: 0.15 }, '-=0.3')
  

  // 2. TAMBAHKAN LOGIKA ANIMASI ANGKA DI SINI (Kolom Kiri)
  const counter = { val: 0 }
  gsap.to(counter, {
    val: 13200,
    duration: 2.5,
    ease: 'power3.out',
    delay: 0.8, // Menunggu cardLeft muncul terlebih dahulu
    onUpdate: () => {
      displayPoints.value = Math.floor(counter.val).toLocaleString('en-US')
    }
  })

  // 📍 TAMBAHAN BARU: Animasi penghitung untuk kolom tengah
  const centerCounter = { airlines: 0, percent: 0, circle: 0 }
  gsap.to(centerCounter, {
    airlines: 200,
    percent: 90,
    circle: 80,
    duration: 2.5,
    ease: "power3.out",
    delay: 1.2, // Menunggu cardCenter muncul
    onUpdate: () => {
      scannedAirlines.value = Math.floor(centerCounter.airlines)
      satisfactionRate.value = Math.floor(centerCounter.percent)
      circleProgress.value = Math.floor(centerCounter.circle)
    }
  })

  // gerakan mengambang halus & berkelanjutan pada tiap kartu, tiap kartu punya ritme berbeda
  gsap.to(cardLeft.value, { y: '+=12', duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  gsap.to(cardCenter.value, { y: '-=14', duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.3 })
  gsap.to(cardRight.value, { y: '+=10', duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.6 })

  // rotasi lambat untuk lingkaran putus-putus
  gsap.to('.dashed-orbit', { rotate: 360, duration: 18, ease: 'none', repeat: -1, transformOrigin: '50% 50%' })

  // pesawat kecil "mengambang" mengikuti lingkaran putus-putus
  gsap.to('.plane-icon', { y: -4, x: 3, rotate: 6, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
})
</script>

<template>
  <section class="relative overflow-hidden bg-[#03071E] pb-28 pt-12 md:pb-40">

    <!-- pola garis vertikal 3D curtain/pillars -->
    

    <!-- bottom glow (seperti di referensi gambar) -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom_center,rgba(59,91,255,0.4)_0%,transparent_70%)]"></div>

    <!-- headline section -->
    <div class="relative z-40 mx-auto mt-24 md:mt-32 max-w-5xl px-6 text-center">
      <span class="hero-badge mb-8 inline-flex items-center gap-2 rounded-full bg-[#162055]/60 px-5 py-2 text-[13px] text-white/90 backdrop-blur shadow-sm border border-white/5">
        Fly Smarter With <span class="font-semibold text-[#6B85FF]">AeroLuxe Airlines ✈</span>
      </span>

      <h1 class="font-display relative text-5xl font-bold leading-[1.1] text-white md:text-[6rem] tracking-tight">
        
        <!-- Dotted loop arc on the left -->
        <div class="absolute -left-12 md:-left-24 top-0 w-48 h-48 md:w-64 md:h-64 text-white/30 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
            <path d="M 80 10 A 40 40 0 1 0 80 90" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3" />
            <text x="75" y="93" font-size="12" style="transform: rotate(15deg); transform-origin: 75px 93px;">✈</text>
          </svg>
        </div>
        
        <span class="hero-title-line relative z-10 inline-block">
          Save Time &amp; Money
        </span>
        <br />
        <span class="hero-title-line relative z-10 flex items-center justify-center gap-3">
          On Every Trip
          <span class="inline-flex relative items-center justify-center">
            <span class="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#3B5BFF] text-xl z-10"></span>
            <span class="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white text-xl -ml-3 z-20 shadow-md border border-slate-100"></span>
          </span>
        </span>
      </h1>

      <p class="hero-subtitle mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white/70 md:text-[15px]">
        discover the cheapest fares, get personalized flight recommendations, and book effortlessly<br class="hidden md:block" />with our ai-powered platform.
      </p>

      <button class="hero-cta group mt-8 relative z-50 -mb-8 md:-mb-12 inline-flex items-center gap-4 rounded-full bg-[#6B85FF] pl-8 pr-2 py-2 text-[15px] font-semibold text-white shadow-[0_0_30px_rgba(107,133,255,0.4)] transition-colors transition-shadow duration-300 hover:bg-[#3B5BFF] hover:shadow-[0_0_40px_rgba(59,91,255,0.6)]">
        Search Flights Now
        <span class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#3B5BFF] text-lg font-bold transition-transform duration-300 group-hover:-rotate-45" aria-hidden="true">→</span>
      </button>
    </div>

    <!-- kartu-kartu (glassmorphism) -->
    <div class="relative z-10 mx-auto mt-16 grid max-w-6xl grid-cols-1 items-start gap-8 px-6 md:mt-0 md:grid-cols-[0.85fr_1.1fr_0.85fr] md:gap-8 md:px-10">
      
      <!-- kolom kiri -->
      <div ref="cardLeft" class="relative flex flex-col gap-4 md:-mt-24">
        <div class="relative rounded-[2rem] border border-white/60 bg-[#F4F6FC] p-7 shadow-[0_15px_40px_rgba(10,17,40,0.15)]">
          <!-- Sparkles SVG with Gradients -->
          <svg class="absolute -right-6 -top-4 w-30 h-30 drop-shadow-xl" viewBox="0 0 24 24" fill="url(#sparkleGrad1)">
            <defs>
              <linearGradient id="sparkleGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#A5B4FC" />
                <stop offset="50%" stop-color="#818CF8" />
                <stop offset="100%" stop-color="#E879F9" />
              </linearGradient>
            </defs>
            <path d="M12 0 C12 9 15 12 24 12 C15 12 12 15 12 24 C12 15 9 12 0 12 C9 12 12 9 12 0 Z" />
          </svg>
          <svg class="absolute right-14 -top-6 w-18 h-18 drop-shadow-lg" viewBox="0 0 24 24" fill="url(#sparkleGrad2)">
            <defs>
              <linearGradient id="sparkleGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#C084FC" />
                <stop offset="100%" stop-color="#818CF8" />
              </linearGradient>
            </defs>
            <path d="M12 2 C12 8 14 10 20 10 C14 10 12 12 12 18 C12 12 10 10 4 10 C10 10 12 8 12 2 Z" />
          </svg>
          
          <h3 class="text-[1.70rem] font-bold leading-[1.1] text-[#162055]">Your Airlume<br/>Points</h3>
          <p class="mt-2 text-[19px] font-medium text-[#94A3B8]">Last Update</p>
          
          <div class="mt-1 flex items-end gap-3">
            <span class="text-[3rem] font-bold leading-none text-[#6B85FF] tracking-tight">
        {{ displayPoints }}
      </span>
            <span class="mb-2.5 flex items-center gap-1.5 rounded-full bg-[#162055] px-2.5 py-1 text-[13px] font-bold text-white shadow-md">
              <svg class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
              </svg>
              Ready
            </span>
          </div>
          <p class="mt-1.5 text-[19px] font-medium text-[#94A3B8]">Points Available</p>
          
          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B85FF] text-white shadow-md">
                <!-- Sparkle icon SVG -->
                <svg class="w-7 h-7" viewBox="1 1 24 24" fill="currentColor">
                  <path d="M19 8l-1-2.2L15.8 5l2.2-1L19 1.8l1 2.2L22.2 5l-2.2 1zM11.5 22l-2-4.5L5 15.5l4.5-2 2-4.5 2 4.5 4.5 2-4.5 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-[13px] font-bold text-[#162055]">Next Reward</p>
                <p class="text-[13px] font-bold text-[#162055]">$20 off at <span class="text-[#6B85FF]">900 pts</span></p>
              </div>
            </div>
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#162055] shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:scale-105 cursor-pointer text-xl font-bold">→</div>
          </div>
        </div>

        <!-- Floating pills -->
        <div class="mt-4 flex flex-col gap-3">
          <!-- Pill 1 -->
          <div class="hero-floating-pill w-[85%] flex items-center gap-3.5 rounded-full border border-white/40 bg-white/90 px-4 py-2.5 shadow-[0_10px_25px_rgba(10,17,40,0.1)] backdrop-blur-md cursor-pointer transition duration-300 hover:scale-[1.03] hover:bg-white hover:shadow-xl">
            <div class="flex shrink-0 h-9 w-9 items-center justify-center rounded-full bg-[#3B5BFF]">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-[13.5px] font-bold text-[#162055] leading-tight tracking-tight">Claim 1,000 Bonus Points</span>
              <span class="text-[11px] font-medium text-slate-500 leading-tight">Sign up & book your first flight</span>
            </div>
          </div>
          
          <!-- Pill 2 -->
          <div class="hero-floating-pill w-[75%] ml-10 flex items-center gap-3.5 rounded-full border border-white/40 bg-white/90 px-4 py-2.5 shadow-[0_10px_25px_rgba(10,17,40,0.1)] backdrop-blur-md cursor-pointer transition duration-300 hover:scale-[1.03] hover:bg-white hover:shadow-xl">
            <div class="flex shrink-0 h-9 w-9 items-center justify-center rounded-full bg-[#0A1128]">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-[13.5px] font-bold text-[#162055] leading-tight tracking-tight">24 users booking now</span>
              <span class="text-[11px] font-medium text-slate-500 leading-tight">AI just saved someone $50</span>
            </div>
          </div>
        </div>
      </div>

      <!-- kolom tengah -->
      <div ref="cardCenter" class="relative rounded-[2.5rem] border border-white/60 bg-[#F4F6FC] p-7 shadow-[0_15px_40px_rgba(10,17,40,0.25)] backdrop-blur-xl md:mt-4">
        <div class="flex items-center justify-center">
          <span class="rounded-full bg-white px-5 py-2 text-[17px] font-medium text-[#162055] shadow-sm">
            AeroLuxe Smart <span class="text-[#6B85FF]">Search</span>
          </span>
        </div>
        
        <h3 class="mt-8 px-1 text-left text-[2.1rem] font-medium leading-[1.2] tracking-tight">
          <span class="text-[#162055]">Scanning </span><span class="text-[#6B85FF]">{{ scannedAirlines }}+</span><br/>
          <span class="text-[#94A3B8]">Airlines In Real-Time</span>
        </h3>

        <div class="mt-6 flex items-center gap-4 px-1">
          <div class="relative grid h-[5rem] w-[5rem] shrink-0 place-items-center rounded-full bg-[#F4F6FC] text-sm font-bold text-[#162055] drop-shadow-sm">
            <svg class="absolute inset-0 h-[5rem] w-[5rem] -rotate-90 drop-shadow-md" viewBox="0 0 36 36">
              <path class="text-white drop-shadow-sm" stroke-width="4.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path class="text-[#6B85FF]" :stroke-dasharray="`${circleProgress}, 100`" stroke-width="4.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            {{ satisfactionRate }}%
          </div>
          <p class="text-[18.5px] font-medium leading-[1.4] text-[#475569]">
            Price expected to drop for sydney flight in three <br> days🔥
          </p>
        </div>

        <div class="relative mt-8 flex h-[200px] w-full items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-slate-100 to-slate-200">
          <div class="h-full w-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-100 to-slate-200">
    <img src="/images/front_airplane.jpg" alt="Airplane takeoff" class="h-full w-full object-cover" />
  </div>
          
          <div class="absolute bottom-6 -right-30 z-20 flex items-center gap-3 rounded-full border border-white/60 bg-white/60 px-4 py-2.5 shadow-[0_20px_40px_rgba(10,17,40,0.25)] backdrop-blur-2xl">
            <div class="flex -space-x-2">
              <img src="/images/profile_pic.jpg" class="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm" />
              <img src="/images/profile_pic.jpg" class="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm" />
              <img src="/images/profile_pic.jpg" class="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm" />
            </div>
            <div class="pr-2">
              <p class="text-[14px] font-bold text-slate-900 leading-tight">90% Users Satisfied</p>
              <p class="text-[12px] font-medium text-slate-500 leading-tight">Top 5 flyers saved $150 last month</p>
            </div>
          </div>
        </div>
      </div>

      <!-- kolom kanan -->
      <div ref="cardRight" class="relative flex items-center justify-center md:-mt-8 ">
        <StackedCardCarousel />
      </div>
    </div>

    <!-- transisi ke section terang di bawahnya -->
<div class="pointer-events-none absolute inset-x-0 -bottom-1 h-48 md:h-[220px] bg-slate-50 [border-radius:50%_50%_0_0_/_100%_100%_0_0]"></div> 

</section>


</template>

