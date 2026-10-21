<script setup lang="ts">
interface Props {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
}

withDefaults(defineProps<Props>(), {
  align: 'center',
  dark: false,
})
</script>

<template>
  <div
    :class="[
      'mb-12 md:mb-16',
      align === 'center' ? 'text-center' : 'text-left',
    ]"
  >
    <span
      v-if="label"
      class="inline-block px-5 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-5"
      :class="
        dark
          ? 'bg-white/10 text-electric-300 border border-white/10'
          : 'bg-electric-50 text-electric-500 border border-electric-100'
      "
    >
      {{ label }}
    </span>
    <h2
      class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold leading-tight mb-4"
      :class="dark ? 'text-white' : 'text-text-dark'"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="text-lg md:text-xl max-w-2xl leading-relaxed"
      :class="[
        dark ? 'text-white/60' : 'text-text-muted',
        align === 'center' ? 'mx-auto' : '',
      ]"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
