<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

const baseClasses =
  'inline-flex items-center justify-center font-heading font-semibold rounded-full transition-all duration-300 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-400'

const variantClasses: Record<string, string> = {
  primary:
    'bg-electric-500 text-white hover:bg-electric-400 hover:shadow-glow hover:scale-105 active:scale-[0.98]',
  secondary:
    'border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-[0.98]',
  ghost:
    'text-electric-400 hover:text-electric-300 hover:bg-white/5 active:scale-[0.98]',
  gold:
    'bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-[0.98]',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-5 py-2 text-sm gap-2',
  md: 'px-7 py-3 text-base gap-2.5',
  lg: 'px-9 py-4 text-lg gap-3',
}

const classes = `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :class="classes"
    :aria-label="ariaLabel"
  >
    <slot />
  </a>
  <button
    v-else
    :class="classes"
    :aria-label="ariaLabel"
  >
    <slot />
  </button>
</template>
