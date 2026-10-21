<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <div
    class="select-none rounded-full border border-white/10 bg-white/95 px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-700 shadow-lg"
  >
    {{ label }}
  </div>
</template>