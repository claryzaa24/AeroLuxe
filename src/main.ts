import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import './style.css'
import App from './App.vue'

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

createApp(App).mount('#app')
