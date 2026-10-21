<script setup lang="ts">
import { ref } from 'vue'
import { footerColumns } from '@/data/navigation'

const email = ref('')
const subscribed = ref(false)

const handleSubscribe = () => {
  if (email.value) {
    subscribed.value = true
    email.value = ''
    setTimeout(() => {
      subscribed.value = false
    }, 3000)
  }
}

const currentYear = new Date().getFullYear()

const socialLinks = [
  { name: 'Instagram', href: '#', icon: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z' },
  { name: 'Twitter / X', href: '#', icon: 'M22.46 6c-.85.38-1.78.64-2.73.76 1-.6 1.76-1.54 2.12-2.67-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.58-2.11-9.96-5.02-.42.72-.66 1.56-.66 2.46 0 1.68.85 3.16 2.14 4.02-.79-.02-1.53-.24-2.18-.6v.06c0 2.35 1.67 4.31 3.88 4.76-.4.1-.83.16-1.27.16-.31 0-.62-.03-.92-.08.63 1.96 2.45 3.39 4.61 3.43-1.69 1.32-3.83 2.1-6.15 2.1-.4 0-.8-.02-1.19-.07 2.19 1.4 4.78 2.22 7.57 2.22 9.07 0 14.02-7.52 14.02-14.02 0-.21 0-.42-.01-.63.96-.7 1.8-1.56 2.46-2.55z' },
  { name: 'Facebook', href: '#', icon: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z' },
  { name: 'YouTube', href: '#', icon: 'M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z' },
]
</script>

<template>
  <!-- pt-0 memastikan tidak ada jarak garis warna yang mencuat di bawah section membership -->
  <footer class="bg-[#0B132B] pt-0 pb-32 relative overflow-hidden text-white" role="contentinfo">
    
    <!-- Ambient Glow Background Halus -->
    <div
      class="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_40%)]"
    >
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-electric-500/10 rounded-full blur-[160px]"></div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-28">
      
      <!-- CARD MENGAMBANG GLASSMORPHISM -->
      <div class="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative z-10">
        
        <!-- TOP SECTION: TATA LETAK AWAL PRESISI -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start mb-12">
          
          <!-- Brand Column -->
          <div class="lg:col-span-4">
            <div class="flex items-center gap-3 mb-5">
              <svg class="w-9 h-9 text-electric-400" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L36 32H4L20 4Z" fill="currentColor" opacity="0.2" />
                <path d="M8 30L20 8L32 30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14 22H26" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <circle cx="20" cy="16" r="2" fill="currentColor" />
              </svg>
              <div>
                <span class="text-xl font-heading font-bold text-white tracking-tight">
                  Aero<span class="text-electric-400">Luxe</span>
                </span>
                <span class="block text-[10px] text-white/40 font-medium tracking-widest uppercase -mt-0.5">
                  Airlines
                </span>
              </div>
            </div>
            
            <p class="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              Maskapai penerbangan premium #1 dunia. Menghubungkan lebih dari 500 destinasi di seluruh dunia dengan fasilitas kelas dunia dan pelayanan terbaik.
            </p>

            <!-- Social Icons -->
            <div class="flex gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.href"
                :aria-label="social.name"
                class="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/50 hover:bg-electric-500/20 hover:text-electric-400 hover:border-electric-500/30 transition-all duration-300"
              >
                <svg class="w-[1.125rem] h-[1.125rem]" viewBox="0 0 24 24" fill="currentColor">
                  <path :d="social.icon" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Navigation Columns (Perusahaan, Layanan, Program, Bantuan) -->
          <div class="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div v-for="column in footerColumns" :key="column.title">
              <h3 class="text-sm font-heading font-semibold text-white mb-4 tracking-wide">
                {{ column.title }}
              </h3>
              <ul class="space-y-2.5">
                <li v-for="link in column.links" :key="link.label">
                  <a
                    :href="link.href"
                    class="text-sm text-white/40 hover:text-electric-400 transition-colors duration-300"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Newsletter Column -->
          <div class="lg:col-span-3">
            <h3 class="text-sm font-heading font-semibold text-white mb-4 tracking-wide">
              Newsletter
            </h3>
            <p class="text-sm text-white/40 mb-4 leading-relaxed">
              Dapatkan penawaran eksklusif dan info penerbangan terbaru langsung di inbox Anda.
            </p>
            <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row gap-2">
              <input
                v-model="email"
                type="email"
                placeholder="Email Anda"
                required
                aria-label="Alamat email untuk newsletter"
                class="w-full px-4 py-2.5 rounded-xl sm:rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-all"
              />
              <button
                type="submit"
                class="w-full sm:w-auto px-5 py-2.5 rounded-xl sm:rounded-full bg-electric-500 text-white text-sm font-semibold hover:bg-electric-400 hover:shadow-glow-sm transition-all duration-300 whitespace-nowrap cursor-pointer text-center"
                aria-label="Berlangganan newsletter"
              >
                <span v-if="!subscribed">Kirim</span>
                <svg v-else class="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </button>
            </form>
          </div>

        </div>

        <!-- BOTTOM BAR -->
        <div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs text-white/30">
            &copy; {{ currentYear }} AeroLuxe Airlines. All rights reserved.
          </p>
          <div class="flex gap-6 text-xs text-white/30">
            <a href="#" class="hover:text-white/60 transition-colors">Privasi</a>
            <a href="#" class="hover:text-white/60 transition-colors">Syarat Layanan</a>
            <a href="#" class="hover:text-white/60 transition-colors">Cookie</a>
          </div>
        </div>

      </div>

    </div>

    <!-- TEKS AEROLUXE BESAR DI LUAR CARD (POSISI KIRI & TERPOTONG SETENGAH DI BAWAH) -->
    <div class="absolute -bottom-50 -left-20 overflow-hidden text-center pointer-events-none select-none z-0">
      <span class="block font-heading font-black text-[24vw] leading-none text-white/[0.025] tracking-tighter uppercase translate-y-2">
        AeroLuxe
      </span>
    </div>

  </footer>
</template>