import type { Step } from '@/types'

export const steps: Step[] = [
  {
    number: '01',
    title: 'Cari & Pilih Penerbangan',
    description: 'Masukkan tujuan dan tanggal perjalanan Anda. AI kami akan menampilkan penerbangan terbaik dengan harga teroptimal dan rute ternyaman.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>`,
    details: {
      subtitle: 'Fitur Pencarian Pintar AI',
      features: [
        'Prediksi tren harga tiket berbasis AI',
        'Filter fleksibel berdasarkan durasi dan maskapai',
        'Rekomendasi rute paling efisien'
      ]
    }
  },
  {
    number: '02',
    title: 'Pilih Kursi & Bagasi',
    description: 'Personalisasi penerbangan Anda dengan pilih kursi favorit, atur bagasi, dan pesan menu makanan sesuai preferensi diet Anda.',
    // Diganti ke Icon Kursi
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v-4.25c0-1.094-.787-2.036-1.872-2.18-2.087-.277-4.216-.42-6.378-.42s-4.291.143-6.378.42c-1.085.144-1.872 1.086-1.872 2.18v4.25m16.5 0a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 14.15m16.5 0V18.75a2.25 2.25 0 0 1-2.25 2.25h-10.5A2.25 2.25 0 0 1 4.5 18.75v-4.6" /></svg>`,
    details: {
      subtitle: 'Kenyamanan Ekstra Sesuai Keinginan',
      features: [
        'Pilih posisi kursi (Extra Legroom, Window, Aisle)',
        'Tambahan kuota bagasi hingga 40kg',
        'Pemesanan makanan khusus (Halal, Vegan, Child Meal)'
      ]
    }
  },
  {
    number: '03',
    title: 'Boarding Pass Digital & Notifikasi',
    description: 'Terima boarding pass digital langsung di smartphone Anda. Dapatkan notifikasi real-time untuk gate change, delay, dan status penerbangan.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>`,
    details: {
      subtitle: 'Akses Instan & Pengingat Real-Time',
      features: [
        'Check-in cepat tanpa antre di bandara',
        'Notifikasi perubahan gate dan status jadwal penerbangan',
        'Integrasi langsung ke Apple Wallet / Google Wallet'
      ]
    }
  }
]