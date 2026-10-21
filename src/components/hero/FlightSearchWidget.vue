<script setup lang="ts">
import { ref } from 'vue'

const from = ref('')
const to = ref('')
const date = ref('')
const passengers = ref('1')
</script>

<template>
  <div class="glass-strong rounded-2xl sm:rounded-full p-3 sm:p-2 w-full max-w-3xl mx-auto shadow-float">
    <form
      @submit.prevent
      class="flex flex-col sm:flex-row items-center gap-2 sm:gap-0"
    >
      <!-- From -->
      <div class="flex items-center gap-2 px-4 py-2 w-full sm:w-auto sm:flex-1 sm:border-r border-gray-200">
        <svg class="w-5 h-5 text-electric-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
        <input
          v-model="from"
          type="text"
          placeholder="Dari mana?"
          aria-label="Kota asal"
          class="w-full bg-transparent text-sm text-text-dark placeholder:text-text-light focus:outline-none font-medium"
        />
      </div>

      <!-- To -->
      <div class="flex items-center gap-2 px-4 py-2 w-full sm:w-auto sm:flex-1 sm:border-r border-gray-200">
        <svg class="w-5 h-5 text-electric-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <input
          v-model="to"
          type="text"
          placeholder="Ke mana?"
          aria-label="Kota tujuan"
          class="w-full bg-transparent text-sm text-text-dark placeholder:text-text-light focus:outline-none font-medium"
        />
      </div>

      <!-- Date -->
      <div class="flex items-center gap-2 px-4 py-2 w-full sm:w-auto sm:flex-1 sm:border-r border-gray-200">
        <svg class="w-5 h-5 text-electric-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
        <input
          v-model="date"
          type="date"
          aria-label="Tanggal keberangkatan"
          class="w-full bg-transparent text-sm text-text-dark placeholder:text-text-light focus:outline-none font-medium"
        />
      </div>

      <!-- Passengers -->
      <div class="flex items-center gap-2 px-4 py-2 w-full sm:w-auto sm:flex-1">
        <svg class="w-5 h-5 text-electric-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
        <select
          v-model="passengers"
          aria-label="Jumlah penumpang"
          class="w-full bg-transparent text-sm text-text-dark focus:outline-none font-medium cursor-pointer"
        >
          <option value="1">1 Dewasa</option>
          <option value="2">2 Dewasa</option>
          <option value="3">3 Dewasa</option>
          <option value="4">4 Dewasa</option>
          <option value="5">5+ Dewasa</option>
        </select>
      </div>

      <!-- Search Button -->
      <button
        type="submit"
        class="w-full sm:w-auto px-6 py-3 bg-electric-500 text-white rounded-full sm:rounded-full font-semibold text-sm hover:bg-electric-400 hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        aria-label="Cari penerbangan"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <span class="sm:hidden">Cari Penerbangan</span>
      </button>
    </form>
  </div>
</template>
