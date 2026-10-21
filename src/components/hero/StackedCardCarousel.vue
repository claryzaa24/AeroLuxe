<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'

// Data destinasi reaktif
const destinations = ref([
  {
    id: 'd1',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    route: 'JKT ✈ KIX',
    city: 'Kyoto, Japan',
    price: '$499',
    tag: 'Best Deal'
  },
  {
    id: 'd2',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop',
    route: 'NYC ✈ CDG',
    city: 'Paris, France',
    price: '$399',
    tag: 'Trending'
  },
  {
    id: 'd3',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop',
    route: 'LHR ✈ ZRH',
    city: 'Swiss Alps',
    price: '$599',
    tag: 'High ROI'
  },
  {
    id: 'd4',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop',
    route: 'DXB ✈ JTR',
    city: 'Santorini, Greece',
    price: '$649',
    tag: 'Hot Pick'
  }
])

// Fungsi untuk menentukan posisi dasar setiap indeks di dalam stack
const getCardStyles = (index: number) => {
  // Pola rotasi miring (fanning) untuk kartu di belakang
  const rotations = [0, -4, 3, -5] 

  return {
    y: index * 22, // offset vertikal makin turun ke bawah
    scale: 1 - index * 0.05, // makin ke belakang makin mengecil
    rotation: rotations[index] || 0, // efek miring
    opacity: index === 0 ? 1 : 1 - (index * 0.25), // makin ke belakang makin redup
    zIndex: 10 - index
  }
}

let intervalId: ReturnType<typeof setInterval>

const playAnimation = () => {
  const cards = gsap.utils.toArray('.carousel-card') as HTMLElement[]
  if (cards.length === 0) return

  const firstCard = cards[0]!
  const otherCards = cards.slice(1)

  const tl = gsap.timeline({
    onComplete: () => {
      // 1. Pindahkan kartu terdepan ke urutan paling belakang
      const shifted = destinations.value.shift()
      if (shifted) destinations.value.push(shifted)

      // 2. Tunggu DOM ter-update oleh Vue
      nextTick(() => {
        const newCards = gsap.utils.toArray('.carousel-card') as HTMLElement[]
        const newlyAddedCard = newCards[newCards.length - 1]

        // 3. Reset style kartu-kartu yang tidak baru ditambahkan (mencegah flicker)
        newCards.forEach((card, i) => {
          if (card !== newlyAddedCard) {
            gsap.set(card, getCardStyles(i))
          }
        })

        // 4. Kartu yang dipindah ke belakang dimunculkan dengan transisi halus dari atas
        if (newlyAddedCard) {
          gsap.fromTo(newlyAddedCard,
            { y: getCardStyles(3).y - 40, scale: 0.8, rotation: 0, opacity: 0, zIndex: getCardStyles(3).zIndex },
            { y: getCardStyles(3).y, scale: getCardStyles(3).scale, rotation: getCardStyles(3).rotation, opacity: getCardStyles(3).opacity, duration: 0.6, ease: 'power2.out' }
          )
        }
      })
    }
  })

  // Animasi kartu paling depan: meluncur ke BAWAH dan memudar
  tl.to(firstCard, {
    y: 200, // Berubah menjadi positif agar jatuh ke bawah
    opacity: 0,
    scale: 0.85,
    rotation: -10, // Tambahan efek memutar sedikit saat jatuh
    duration: 1.2,
    ease: 'power3.inOut'
  }, 0)

  // Bersamaan dengan itu, kartu di belakangnya maju mengisi posisi di depannya
  otherCards.forEach((card, i) => {
    tl.to(card, {
      y: getCardStyles(i).y,
      scale: getCardStyles(i).scale,
      rotation: getCardStyles(i).rotation, // Transisi rotasi agar tegak lurus saat di depan
      opacity: getCardStyles(i).opacity,
      zIndex: getCardStyles(i).zIndex,
      duration: 1.2,
      ease: 'power3.inOut'
    }, 0)
  })
}

onMounted(() => {
  // Inisialisasi posisi awal stack tanpa animasi
  gsap.set('.carousel-card', {
    y: (i) => getCardStyles(i).y,
    scale: (i) => getCardStyles(i).scale,
    rotation: (i) => getCardStyles(i).rotation,
    opacity: (i) => getCardStyles(i).opacity,
    zIndex: (i) => getCardStyles(i).zIndex
  })

  // Auto-play animasi tiap 3 detik
  intervalId = setInterval(playAnimation, 4000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="relative w-full h-[400px] flex justify-center items-start pt-4 perspective-1000">
    <div class="relative w-full max-w-[290px] h-[340px]">
      <div
        v-for="(dest) in destinations"
        :key="dest.id"
        class="carousel-card absolute inset-0 w-full h-full rounded-[2rem] border border-white/10 bg-[#0f143c]/90 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col will-change-transform transform-origin-bottom"
      >
        <!-- Badge -->
        <div class="absolute top-4 left-4 z-10 rounded-full bg-black/40 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold text-white border border-white/10 shadow-md">
          <span class="text-[#6B85FF] mr-1.5">✦</span>{{ dest.tag }}
        </div>

        <!-- Image Area -->
        <div class="h-[180px] w-full shrink-0 relative">
          <img :src="dest.image" :alt="dest.city" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0f143c]/95 via-[#0f143c]/20 to-transparent"></div>
        </div>

        <!-- Content Area -->
        <div class="px-6 pb-6 pt-1 flex flex-col flex-grow justify-between text-white relative z-10">
          <div>
            <p class="text-[12px] font-bold tracking-widest text-[#6B85FF] mb-1.5 uppercase">{{ dest.route }}</p>
            <h3 class="text-[22px] font-bold leading-tight tracking-tight drop-shadow-sm">{{ dest.city }}</h3>
          </div>
          
          <div class="flex items-center justify-between mt-3">
            <span class="text-[26px] font-black tracking-tight text-white drop-shadow-sm">{{ dest.price }}</span>
            <button class="group flex items-center justify-center h-[42px] w-[42px] rounded-full bg-white text-[#162055] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <svg class="w-5 h-5 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>