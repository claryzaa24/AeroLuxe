<script setup lang="ts">
import Hero from '@/components/hero/Hero.vue'
import FeaturesSection from '@/components/features/FeaturesSection.vue'
import HowItWorks from '@/components/how-it-works/HowItWorks.vue'
import DestinationsSection from '@/components/destinations/DestinationsSection.vue'
import StatsBar from '@/components/testimonials/StatsBar.vue'
import TestimonialCard from '@/components/testimonials/TestimonialCard.vue'
import MembershipSection from '@/components/membership/MembershipSection.vue'
</script>

<template>
  <main>
    <Hero />
    <FeaturesSection />
    <HowItWorks />
    <DestinationsSection />
    <StatsBar />
    <TestimonialCard />
    <MembershipSection />
  </main>
</template>
