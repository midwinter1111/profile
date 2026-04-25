<script setup lang="ts">
import { useTravelPageLogic } from '../composables/TravelPage.composable'
import SecDivider from '../components/SecDivider.vue'

const { siteLinks, goBack } = useTravelPageLogic()
</script>

<template>
  <div class="page-enter page-root">
    <div class="page-veil" aria-hidden="true" />
    <div class="subpage-wrap">
      <div class="subpage-hero">
        <button class="back-btn" @click="goBack">← Back</button>
        <div class="subpage-en" style="color: #7bc4a0">Travel</div>
        <h1 class="subpage-ja">旅の記録</h1>
      </div>

      <SecDivider label="旅日記サイト" accent="#7bc4a0" />

      <a
        v-for="link in siteLinks"
        :key="link.title"
        :href="link.url"
        class="link-card"
        target="_blank"
        rel="noopener"
      >
        <div class="link-card-header">
          <div class="link-card-title">{{ link.title }}</div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            class="link-ext-icon"
            aria-hidden="true"
          >
            <path
              d="M2 12L11 3M11 3H6M11 3V8"
              stroke="#7bc4a0"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <rect x="1" y="1" width="6" height="6" rx="1" stroke="#7bc4a0" stroke-width="1" opacity="0.4" />
          </svg>
        </div>
        <div class="link-card-sub">{{ link.sub }}</div>
        <div class="link-card-arrow" style="color: #7bc4a0">外部サイトへ</div>
      </a>
    </div>
    <footer class="footer">© 真冬</footer>
  </div>
</template>

<style scoped>
.page-root {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

.page-veil {
  position: fixed;
  inset: 0;
  background: rgba(4, 6, 14, 0.72);
  z-index: 0;
  pointer-events: none;
}

.subpage-wrap {
  position: relative;
  z-index: 1;
  max-width: 680px;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

.link-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0;
}

.link-ext-icon {
  flex-shrink: 0;
  margin-top: 3px;
  opacity: 0.45;
}
</style>
