<script setup lang="ts">
defineProps<{
  label: string
  accent: string
}>()
</script>

<template>
  <div class="sec-divider">
    <div
      :style="{
        width: '22px',
        height: '1px',
        background: `linear-gradient(90deg, ${accent}, transparent)`,
        flexShrink: 0,
      }"
    />
    <span class="sec-divider-label" :style="{ color: accent }">{{ label }}</span>
    <div
      :style="{
        flex: 1,
        height: '1px',
        background: `linear-gradient(90deg, ${accent}28, transparent)`,
      }"
    />
  </div>
</template>
