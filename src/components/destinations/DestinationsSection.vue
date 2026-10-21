<script setup lang="ts">
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { destinations } from '@/data/destinations'
import type { Destination } from '@/types'
import DestinationCard from './DestinationCard.vue'

const sectionRef = ref<HTMLElement | null>(null)
const activeTab = ref<'semua' | 'domestik' | 'internasional' | 'populer'>('semua')
const searchQuery = ref('')

// State Modal & Galeri Foto
const selectedDestination = ref<Destination | null>(null)
const currentImageIndex = ref(0)
const isModalOpen = ref(false)
const isFavorite = ref(false)
const isSaved = ref(false)

// State Toast Notification
const toastMessage = ref('')
const toastType = ref<'favorite' | 'save' | 'booking'>('favorite')
const showToast = ref(false)
let toastTimer: ReturnType<typeof setTimeout> | null = null

const tabs = [
  { id: 'semua' as const, label: 'Semua' },
  { id: 'domestik' as const, label: 'Domestik' },
  { id: 'internasional' as const, label: 'Internasional' },
  { id: 'populer' as const, label: 'Populer' },
]

const filteredDestinations = computed(() => {
  return destinations.filter((d) => {
    const matchesTab = activeTab.value === 'semua' || d.category === activeTab.value
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesTab && matchesSearch
  })
})

const activeImages = computed(() => {
  if (!selectedDestination.value) return []
  return selectedDestination.value.images && selectedDestination.value.images.length > 0
    ? selectedDestination.value.images
    : [selectedDestination.value.image]
})

// Fungsi Menampilkan Toast
const triggerToast = (message: string, type: 'favorite' | 'save' | 'booking') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true

  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 2500)
}

const openModal = (destination: Destination) => {
  selectedDestination.value = destination
  currentImageIndex.value = 0
  isFavorite.value = false
  isSaved.value = false
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const nextImage = () => {
  if (activeImages.value.length === 0) return
  currentImageIndex.value = (currentImageIndex.value + 1) % activeImages.value.length
}

const prevImage = () => {
  if (activeImages.value.length === 0) return
  currentImageIndex.value =
    (currentImageIndex.value - 1 + activeImages.value.length) % activeImages.value.length
}

// Toggle Favorit & Toast
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  if (selectedDestination.value) {
    if (isFavorite.value) {
      triggerToast(`${selectedDestination.value.name} ditambahkan ke Favorit`, 'favorite')
    } else {
      triggerToast(`${selectedDestination.value.name} dihapus dari Favorit`, 'favorite')
    }
  }
}

// Toggle Simpan & Toast
const toggleSave = () => {
  isSaved.value = !isSaved.value
  if (selectedDestination.value) {
    if (isSaved.value) {
      triggerToast(`${selectedDestination.value.name} disimpan ke Koleksi`, 'save')
    } else {
      triggerToast(`${selectedDestination.value.name} dihapus dari Koleksi`, 'save')
    }
  }
}

// Handler Pesan Tiket & Toast
const handleBooking = () => {
  if (selectedDestination.value) {
    triggerToast(`Memproses pemesanan tiket ke ${selectedDestination.value.name}...`, 'booking')
  }
}

const animateCards = async () => {
  await nextTick()
  const cards = sectionRef.value?.querySelectorAll('.destination-card')
  if (!cards || cards.length === 0) return

  gsap.fromTo(
    cards,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      clearProps: 'opacity,transform',
    }
  )
}

watch([activeTab, searchQuery], () => {
  animateCards()
})

onMounted(() => {
  animateCards()
})
</script>

<template>
  <section
    id="destinations"
    ref="sectionRef"
    class="py-20 sm:py-28 bg-surface relative"
    aria-label="Destinasi penerbangan"
  >
    <!-- Ambient Glow Background -->
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-electric-500/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
        
        <!-- KOLOM KIRI: Panel Pencarian & Filter -->
        <div class="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-6">
          <div>
            <span class="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-electric-600 bg-electric-50 border border-electric-100/60 shadow-sm">
              DESTINASI
            </span>
          </div>

          <div class="space-y-3">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-dark leading-tight">
              Jelajahi Dunia Bersama Kami
            </h2>
            <p class="text-text-muted text-base sm:text-lg leading-relaxed">
              Dari surga tropis nusantara hingga metropolis dunia 500+ destinasi menunggu Anda.
            </p>
          </div>

          <div class="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div>
              <label class="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Cari Kota / Negara</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Ketik destinasi impianmu..."
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Kategori</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  class="px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer"
                  :class="
                    activeTab === tab.id
                      ? 'bg-electric-500 text-white shadow-glow-sm'
                      : 'bg-gray-50 text-text-muted border border-gray-100 hover:text-text-dark hover:bg-gray-100'
                  "
                >
                  {{ tab.label }}
                </button>
              </div>
            </div>
          </div>

          <div class="text-xs text-text-muted flex items-center gap-2 pl-1">
            <span class="w-2 h-2 rounded-full bg-electric-500 animate-pulse"></span>
            Menampilkan {{ filteredDestinations.length }} destinasi pilihan
          </div>
        </div>

        <!-- KOLOM KANAN: Grid Kartu -->
        <div class="lg:col-span-7">
          <div v-if="filteredDestinations.length === 0" class="py-16 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p class="text-text-muted text-sm">Tidak ada destinasi yang cocok dengan pencarian Anda.</p>
          </div>

          <TransitionGroup v-else name="card-list" tag="div" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DestinationCard
              v-for="destination in filteredDestinations"
              :key="destination.id"
              :destination="destination"
              @select="openModal"
            />
          </TransitionGroup>
        </div>

      </div>
    </div>

    <!-- MODAL POP-UP DETAIL WIDE INTERAKTIF -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="isModalOpen && selectedDestination"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
          @click.self="closeModal"
        >
          <!-- Container Modal Wide -->
          <div class="relative w-full max-w-2xl sm:max-w-3xl aspect-[16/11] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white/20 text-white flex flex-col justify-between group">
            
            <!-- Gambar Galeri Beranimasi -->
            <Transition name="image-fade" mode="out-in">
              <img
                :key="currentImageIndex"
                :src="activeImages[currentImageIndex]"
                :alt="`${selectedDestination.name} foto ${currentImageIndex + 1}`"
                class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 group-hover:scale-105"
              />
            </Transition>

            <!-- Gradient Vignette Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 z-10 pointer-events-none"></div>

            <!-- Header Control (Kategori + Actions) -->
            <div class="relative z-20 p-5 sm:p-6 flex items-center justify-between">
              <!-- Pill Kategori Dinamis -->
              <div class="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide text-white shadow-lg uppercase">
                <svg class="w-3.5 h-3.5 text-electric-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
                <span>{{ selectedDestination.category }}</span>
              </div>

              <!-- Action Buttons Top Right -->
              <div class="flex items-center gap-2.5">
                <!-- Tombol Favorit -->
                <button
                  @click="toggleFavorite"
                  class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer text-white shadow-lg"
                  :class="isFavorite ? 'text-red-500 bg-white/40' : 'hover:text-red-400'"
                  aria-label="Favorit"
                >
                  <svg class="w-4 h-4" :fill="isFavorite ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>

                <!-- Tombol Simpan -->
                <button
                  @click="toggleSave"
                  class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer text-white shadow-lg"
                  :class="isSaved ? 'text-electric-300 bg-white/40' : 'hover:text-electric-300'"
                  aria-label="Simpan"
                >
                  <svg class="w-4 h-4" :fill="isSaved ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75V21l-5.25-3.15L6.75 21V6.75A2.25 2.25 0 019 4.5h6a2.25 2.25 0 012.25 2.25z" />
                  </svg>
                </button>

                <!-- Tombol Close -->
                <button
                  @click="closeModal"
                  class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer text-white shadow-lg"
                  aria-label="Tutup"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Navigasi Panah Kiri & Kanan -->
            <div v-if="activeImages.length > 1" class="absolute inset-x-4 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
              <button
                @click="prevImage"
                class="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all pointer-events-auto cursor-pointer shadow-lg active:scale-95"
                aria-label="Foto sebelumnya"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <button
                @click="nextImage"
                class="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all pointer-events-auto cursor-pointer shadow-lg active:scale-95"
                aria-label="Foto selanjutnya"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            <!-- Content Bottom Area -->
            <div class="relative z-20 p-6 sm:p-8 space-y-4">
              <div class="flex items-baseline justify-between">
                <h3 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-white drop-shadow-md">
                  {{ selectedDestination.name }}
                </h3>

                <!-- Counter Dinamis Foto -->
                <div class="flex items-center gap-3">
                  <div class="hidden sm:flex gap-1.5 items-center">
                    <span
                      v-for="(_, idx) in activeImages"
                      :key="idx"
                      @click="currentImageIndex = idx"
                      class="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                      :class="idx === currentImageIndex ? 'w-5 bg-electric-400' : 'w-1.5 bg-white/40 hover:bg-white/70'"
                    ></span>
                  </div>

                  <span class="text-xs sm:text-sm font-semibold tracking-widest text-white/80 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {{ currentImageIndex + 1 }}/{{ activeImages.length }}
                  </span>
                </div>
              </div>

              <!-- Deskripsi Ringkas -->
              <p class="text-xs sm:text-sm text-gray-200/90 leading-relaxed max-w-2xl font-normal drop-shadow">
                Nikmati keindahan eksklusif <span class="font-semibold text-white">{{ selectedDestination.name }}, {{ selectedDestination.country }}</span>. Destinasi impian yang menyajikan panorama luar biasa serta layanan penerbangan kelas dunia bersama AeroLuxe.
              </p>

              <!-- Footer Alamat & Tombol Harga -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/10">
                <div class="flex items-center gap-2 text-xs text-gray-300/80">
                  <svg class="w-4 h-4 shrink-0 text-electric-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <p class="font-medium text-white/90">{{ selectedDestination.name }}, {{ selectedDestination.country }}</p>
                </div>

                <button 
                  @click="handleBooking"
                  class="px-6 py-2.5 bg-electric-500 hover:bg-electric-400 text-white font-bold rounded-xl text-xs transition-all duration-300 shadow-lg shadow-electric-500/30 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Mulai ${{ selectedDestination.price }}</span>
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- NOTIFIKASI TOAST GLASSMORPHIC FLOATING -->
    <Teleport to="body">
      <Transition name="toast-slide">
        <div
          v-if="showToast"
          class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-900/90 backdrop-blur-xl border border-white/15 text-white shadow-2xl max-w-sm"
        >
          <!-- Icon Toast Dinamis -->
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            :class="{
              'bg-red-500/20 text-red-400 border border-red-500/30': toastType === 'favorite',
              'bg-electric-500/20 text-electric-300 border border-electric-500/30': toastType === 'save',
              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30': toastType === 'booking'
            }"
          >
            <!-- Icon Favorit (Love) -->
            <svg v-if="toastType === 'favorite'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>

            <!-- Icon Simpan (Bookmark) -->
            <svg v-else-if="toastType === 'save'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M6.32 2.577a1.875 1.875 0 011.58-.877h8.2c.66 0 1.258.347 1.58.877l3.19 5.212A1.875 1.875 0 0121 8.79V19.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19.5V8.79c0-.363.105-.717.303-1.001l3.017-5.212zM12 11.25a.75.75 0 01.75.75v3.69l1.22-1.22a.75.75 0 111.06 1.06l-2.5 2.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06l1.22 1.22V12a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>

            <!-- Icon Pesan / Checkmark -->
            <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <!-- Pesan Toast -->
          <p class="text-xs font-medium text-gray-200 leading-snug">
            {{ toastMessage }}
          </p>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.card-list-enter-active,
.card-list-leave-active {
  transition: all 0.4s ease;
}
.card-list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.card-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.card-list-move {
  transition: transform 0.4s ease;
}

/* Transisi Modal Wide */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(12px);
}

/* Transisi Perpindahan Gambar Galeri */
.image-fade-enter-active,
.image-fade-leave-active {
  transition: opacity 0.4s ease;
}
.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
}

/* Transisi Toast Notification Floating */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}
</style>