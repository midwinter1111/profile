<script setup lang="ts">
import { useAchievementsPageLogic } from '../composables/AchievementsPage.composable'
import SecDivider from '../components/SecDivider.vue'

const { eventAchievements, publishAchievements, workAchievements, goBack } =
  useAchievementsPageLogic()
</script>

<template>
  <div class="page-enter page-root">
    <div class="page-veil" aria-hidden="true" />
    <div class="subpage-wrap">
      <div class="subpage-hero">
        <button class="back-btn" @click="goBack">← Back</button>
        <div class="subpage-en" style="color: #9baee8">Achievements</div>
        <h1 class="subpage-ja">実績</h1>
      </div>

      <SecDivider label="イベント" accent="#7bbcd8" />

      <div v-for="(item, i) in eventAchievements" :key="i" class="achiev-card">
        <div class="achiev-tag" :style="{ color: item.accent, background: `${item.accent}18` }">
          {{ item.tag }}
        </div>
        <div class="achiev-title">{{ item.title }}</div>
        <div v-if="item.desc" class="achiev-desc">{{ item.desc }}</div>
      </div>

      <div class="achiev-section">
        <SecDivider label="出版" accent="#9baee8" />
        <div v-for="(item, i) in publishAchievements" :key="i" class="achiev-card">
          <div class="achiev-tag" :style="{ color: item.accent, background: `${item.accent}18` }">
            {{ item.tag }}
          </div>
          <div class="achiev-title">{{ item.title }}</div>
          <div v-if="item.desc" class="achiev-desc">{{ item.desc }}</div>
        </div>
      </div>

      <div class="achiev-section">
        <SecDivider label="業務実績" accent="#9baee8" />
        <div v-for="(item, i) in workAchievements" :key="i" class="achiev-card">
          <div class="achiev-tag" :style="{ color: item.accent, background: `${item.accent}18` }">
            {{ item.tag }}
          </div>
          <div class="achiev-title">{{ item.title }}</div>
          <div v-if="item.desc" class="achiev-desc">{{ item.desc }}</div>
        </div>
      </div>
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

.achiev-section {
  margin-top: 2.2rem;
}
</style>
