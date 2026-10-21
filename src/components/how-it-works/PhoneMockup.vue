<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeTab = ref<'boarding' | 'seats'>('boarding')
const isQrEnlarged = ref(false)

// Ref & state untuk mengontrol pergerakan fisik bodi HP saat di-scroll
const phoneRef = ref<HTMLElement | null>(null)
const translateY = ref(0)

const handleScroll = () => {
  if (!phoneRef.value) return

  // Mengambil posisi elemen HP relatif terhadap viewport layar
  const rect = phoneRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // HP mulai bergerak ketika bagian atas komponen sudah masuk ke layar
  if (rect.top < windowHeight && rect.bottom > 0) {
    // Menghitung seberapa jauh pengguna men-scroll section ini
    // Nilai multiplier (0.15) menentukan seberapa jauh/cepat HP meluncur turun
    const scrollOffset = (windowHeight - rect.top) * 0.38
    translateY.value = Math.max(0, scrollOffset)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const toggleTab = () => {
  activeTab.value = activeTab.value === 'boarding' ? 'seats' : 'boarding'
}

const toggleQrZoom = (e: Event) => {
  e.stopPropagation()
  isQrEnlarged.value = !isQrEnlarged.value
}
</script>

<template>
  <!-- Wrapper Sticky & Pergerakan Fisik HP -->
  <div
    ref="phoneRef"
    class="sticky top-28 z-20 will-change-transform transition-transform duration-75 ease-out"
    :style="{ transform: `translateY(${translateY}px)` }"
  >
    <div class="phone-mockup relative mx-auto w-[240px] sm:w-[280px] group">
      <!-- Phone Frame -->
      <div
        @click="toggleTab"
        class="relative bg-navy-800 rounded-[2.5rem] p-3 shadow-float border border-white/10 cursor-pointer transform transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:border-electric-500/40 group-hover:shadow-2xl group-hover:shadow-electric-500/20 active:scale-[0.98]"
      >
        <!-- Notch Dynamic Island Style -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-navy-800 rounded-b-2xl z-20 flex items-center justify-center">
          <div class="w-3 h-3 rounded-full bg-black/60 border border-white/10"></div>
        </div>

        <!-- Screen Container -->
        <div class="bg-navy-900 rounded-[2rem] overflow-hidden relative min-h-[460px] flex flex-col justify-between">
          <!-- Top Screen Area -->
          <div>
            <!-- Status Bar -->
            <div class="flex items-center justify-between px-6 pt-3 pb-2 relative z-10">
              <span class="text-white/60 text-xs font-medium">9:41</span>
              <div class="flex items-center gap-1.5">
                <div class="w-3.5 h-2.5 border border-white/40 rounded-sm relative">
                  <div class="absolute inset-0.5 bg-green-400 rounded-[1px]" style="width: 70%"></div>
                </div>
              </div>
            </div>

            <!-- Tampilan 1: Boarding Pass -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 translate-x-4"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition-all duration-200 ease-in absolute w-full"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-4"
            >
              <div v-if="activeTab === 'boarding'" class="px-5 py-2 space-y-3">
                <div class="flex items-center justify-between mb-1">
                  <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-full bg-electric-500/20 flex items-center justify-center text-electric-400">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>
                    </div>
                    <span class="text-white text-sm font-heading font-semibold">AeroLuxe</span>
                  </div>
                  <span class="text-[10px] text-electric-400 bg-electric-500/10 px-2 py-0.5 rounded-full font-medium">Live</span>
                </div>

                <!-- Boarding Pass Card -->
                <div class="bg-white/5 rounded-2xl p-3.5 border border-white/10 group-hover:border-electric-500/30 transition-colors">
                  <div class="flex items-center justify-between mb-3">
                    <div>
                      <p class="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">From</p>
                      <p class="text-white text-xl font-heading font-bold">JKT</p>
                    </div>
                    <div class="flex-1 px-3 flex items-center justify-center">
                      <div class="w-full flex items-center gap-1">
                        <div class="flex-1 h-px bg-electric-500/30"></div>
                        <svg class="w-4 h-4 text-electric-400 shrink-0 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                        <div class="flex-1 h-px bg-electric-500/30"></div>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">To</p>
                      <p class="text-white text-xl font-heading font-bold">SYD</p>
                    </div>
                  </div>

                  <div class="grid grid-cols-3 gap-2 text-center pt-2 border-t border-white/10">
                    <div>
                      <p class="text-white/40 text-[9px] uppercase tracking-wider">Gate</p>
                      <p class="text-white text-xs font-semibold">B12</p>
                    </div>
                    <div>
                      <p class="text-white/40 text-[9px] uppercase tracking-wider">Seat</p>
                      <p class="text-electric-400 text-xs font-bold">14A</p>
                    </div>
                    <div>
                      <p class="text-white/40 text-[9px] uppercase tracking-wider">Boarding</p>
                      <p class="text-white text-xs font-semibold">10:30</p>
                    </div>
                  </div>
                </div>

                <!-- Notification Badge -->
                <div class="bg-electric-500/10 border border-electric-500/20 rounded-xl p-2.5 flex items-start gap-2.5">
                  <div class="w-7 h-7 rounded-full bg-electric-500/20 flex items-center justify-center shrink-0 text-electric-400">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-electric-300 text-[11px] font-semibold">Gate Changed</p>
                    <p class="text-white/50 text-[10px] leading-tight">Gate diperbarui ke B12. Boarding pukul 10:30.</p>
                  </div>
                </div>

                <!-- QR Code -->
                <div class="flex flex-col items-center py-1">
                  <div
                    @click="toggleQrZoom"
                    class="p-2 bg-white/10 rounded-xl border border-white/10 hover:border-electric-400 hover:scale-105 transition-all cursor-zoom-in group/qr"
                    title="Klik untuk perbesar QR"
                  >
                    <svg class="w-12 h-12 text-white/80 group-hover/qr:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                    </svg>
                  </div>
                  <span class="text-[9px] text-white/40 mt-1">Ketuk HP untuk ganti layar</span>
                </div>
              </div>
            </Transition>

            <!-- Tampilan 2: Status Penerbangan & Pilihan Kursi -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-x-4"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition-all duration-200 ease-in absolute w-full"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 translate-x-4"
            >
              <div v-if="activeTab === 'seats'" class="px-5 py-2 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-white">Denah Kursi 14A</span>
                  <span class="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Terkonfirmasi</span>
                </div>

                <div class="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2">
                  <div class="text-[10px] text-white/50 text-center mb-2">Kelas Bisnis — AeroLuxe A350</div>
                  <div class="grid grid-cols-4 gap-2 text-center text-xs">
                    <div class="p-2 bg-white/5 rounded-lg text-white/30">12A</div>
                    <div class="p-2 bg-white/5 rounded-lg text-white/30">12B</div>
                    <div class="p-2 bg-white/5 rounded-lg text-white/30">12C</div>
                    <div class="p-2 bg-white/5 rounded-lg text-white/30">12D</div>

                    <div class="p-2 bg-electric-500 text-white font-bold rounded-lg shadow-glow ring-2 ring-electric-400 animate-pulse">14A</div>
                    <div class="p-2 bg-white/5 rounded-lg text-white/30">14B</div>
                    <div class="p-2 bg-white/5 rounded-lg text-white/30">14C</div>
                    <div class="p-2 bg-white/5 rounded-lg text-white/30">14D</div>
                  </div>
                </div>

                <div class="bg-white/5 p-3 rounded-xl border border-white/10 text-xs space-y-1">
                  <p class="text-white/80 font-medium">Layanan Ekstra Disiapkan:</p>
                  <p class="text-white/50 text-[10px]">✓ Menu Halal Gourmet</p>
                  <p class="text-white/50 text-[10px]">✓ Extra Legroom Seat</p>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Navigation Bar / Indicator -->
          <div class="pb-3 px-6 flex justify-center gap-1.5">
            <div
              class="h-1 rounded-full transition-all duration-300"
              :class="activeTab === 'boarding' ? 'w-6 bg-electric-400' : 'w-2 bg-white/20'"
            ></div>
            <div
              class="h-1 rounded-full transition-all duration-300"
              :class="activeTab === 'seats' ? 'w-6 bg-electric-400' : 'w-2 bg-white/20'"
            ></div>
          </div>
        </div>
      </div>

      <!-- Glow Effect -->
      <div class="absolute -inset-4 bg-electric-500/10 group-hover:bg-electric-500/25 rounded-[3rem] blur-2xl pointer-events-none -z-10 transition-all duration-500"></div>

      <!-- Modal Zoom QR Code -->
      <Teleport to="body">
        <div
          v-if="isQrEnlarged"
          @click="isQrEnlarged = false"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out p-4"
        >
          <div class="bg-navy-900 border border-white/20 p-6 rounded-3xl text-center space-y-4 max-w-xs animate-scale-up">
            <h4 class="text-white font-heading font-semibold text-sm">Boarding Pass QR</h4>
            <div class="p-4 bg-white rounded-2xl flex items-center justify-center">
              <svg class="w-32 h-32 text-black" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
              </svg>
            </div>
            <p class="text-xs text-white/60">Pindai QR ini di gate pemeriksaan bandara</p>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>