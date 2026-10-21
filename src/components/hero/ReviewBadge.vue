<script setup lang="ts">
defineProps<{
  avatar: string
  name: string
  role: string
}>()
</script>

<template>
  <div class="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 py-2 pl-2 pr-5 shadow-xl backdrop-blur-md">
    <img :src="avatar" :alt="name" class="h-10 w-10 rounded-full object-cover" />
    <div class="text-left leading-tight">
      <p class="text-sm font-semibold text-white">{{ name }}</p>
      <p class="text-xs text-white/60">{{ role }}</p>
    </div>
  </div>
</template>