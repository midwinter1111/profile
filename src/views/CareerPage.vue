<script setup lang="ts">
import { useCareerPageLogic } from '../composables/CareerPage.composable'
import SecDivider from '../components/SecDivider.vue'

const { timelineItems, certificationItems, rewardItems, skillCategories, goBack } =
  useCareerPageLogic()
</script>

<template>
  <div class="page-enter page-root">
    <div class="page-veil" aria-hidden="true" />
    <div class="subpage-wrap">
      <div class="subpage-hero">
        <button class="back-btn" @click="goBack">← Back</button>
        <div class="subpage-en" style="color: #7bbcd8">Career</div>
        <h1 class="subpage-ja">経歴</h1>
      </div>

      <SecDivider label="Timeline" accent="#7bbcd8" />

      <div v-for="(item, i) in timelineItems" :key="i" class="timeline-item">
        <div class="tl-year" style="color: #7bbcd8">{{ item.year }}</div>
        <div class="tl-body">
          <div class="tl-title">{{ item.title }}</div>
          <div v-if="item.desc" class="tl-desc">{{ item.desc }}</div>
        </div>
      </div>

      <div class="career-section">
        <SecDivider label="Certification" accent="#9baee8" />
        <div v-for="(item, i) in certificationItems" :key="i" class="timeline-item">
          <div class="tl-year" style="color: #9baee8">{{ item.year }}</div>
          <div class="tl-body">
            <div class="tl-title">{{ item.title }}</div>
            <div v-if="item.desc" class="tl-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>

      <div class="career-section">
        <SecDivider label="Rewards" accent="#5ecac0" />
        <div v-for="(item, i) in rewardItems" :key="i" class="timeline-item">
          <div class="tl-year" style="color: #5ecac0">{{ item.year }}</div>
          <div class="tl-body">
            <div class="tl-title">{{ item.title }}</div>
            <div v-if="item.desc" class="tl-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>

      <div class="skills-section">
        <SecDivider label="Skills" accent="#9baee8" />
        <div v-for="cat in skillCategories" :key="cat.cat" class="skill-category">
          <div class="skill-cat-label" style="color: #9baee8">{{ cat.cat }}</div>
          <div>
            <span v-for="skill in cat.skills" :key="skill" class="skill-tag">{{ skill }}</span>
          </div>
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

.career-section {
  margin-top: 2.2rem;
}

.skills-section {
  margin-top: 2.5rem;
}

.skill-category {
  margin-bottom: 1.4rem;
}

.skill-cat-label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px;
  letter-spacing: 0.25em;
  margin-bottom: 0.65rem;
  opacity: 0.65;
}
</style>
