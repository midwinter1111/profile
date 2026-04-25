<script setup lang="ts">
interface Star {
  id: number
  left: string
  top: string
  size: number
  dur: string
  delay: string
}

const stars: Star[] = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 1.6 + 0.5,
  dur: `${Math.random() * 5 + 3}s`,
  delay: `${Math.random() * 7}s`,
}))
</script>

<template>
  <div class="starfield">
    <div
      v-for="star in stars"
      :key="star.id"
      class="star"
      :style="{
        left: star.left,
        top: star.top,
        width: `${star.size}px`,
        height: `${star.size}px`,
        animationDuration: star.dur,
        animationDelay: star.delay,
      }"
    />
  </div>
</template>

<style scoped>
.starfield {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
