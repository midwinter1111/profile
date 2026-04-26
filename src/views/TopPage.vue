<script setup lang="ts">
import { useTopPageLogic } from '../composables/TopPage.composable'
import SnowCanvas from '../components/SnowCanvas.vue'
import SecDivider from '../components/SecDivider.vue'

const { navPanels, snsLinks, navigateTo } = useTopPageLogic()

const accentDots = [
  { top: '18%', left: '12%' },
  { top: '27%', right: '9%' },
  { top: '11%', right: '31%' },
  { top: '43%', left: '7%' },
  { top: '19%', left: '41%' },
]
</script>

<template>
  <div class="page-enter page-root">
    <!-- ヒーローセクション -->
    <section class="hero-section">
      <div class="aurora-wrap" aria-hidden="true">
        <div class="aurora aurora-1" />
        <div class="aurora aurora-2" />
        <div class="aurora aurora-3" />
      </div>
      <SnowCanvas />
      <div
        v-for="(dot, i) in accentDots"
        :key="i"
        class="accent-dot"
        :style="{ ...dot, opacity: 0.18 + i * 0.05 }"
        aria-hidden="true"
      />
      <div class="hero-text">
        <!-- <div class="hero-subtitle">— Portfolio —</div> -->
        <h1 class="hero-name">ホームページ的なやつ</h1>
        <p class="hero-role">自己紹介とかもろもろ</p>
        <div class="scroll-indicator" aria-hidden="true">
          <div class="scroll-track">
            <div class="scroll-drop" />
          </div>
        </div>
      </div>
    </section>

    <!-- ナビゲーションパネルセクション -->
    <section class="panels-section">
      <div class="dark-veil" aria-hidden="true" />
      <div class="panels-content">
        <div class="nav-panels">
          <button
            v-for="panel in navPanels"
            :key="panel.en"
            class="nav-panel"
            :style="{ '--p-accent': panel.accent }"
            @click="navigateTo(panel.path)"
          >
            <div class="nav-panel-left">
              <div class="nav-panel-en" :style="{ color: panel.accent }">{{ panel.en }}</div>
              <div class="nav-panel-ja">{{ panel.ja }}</div>
              <div class="nav-panel-desc">{{ panel.desc }}</div>
            </div>
            <div class="nav-panel-arrow" :style="{ color: panel.accent }">→</div>
          </button>
        </div>
      </div>
    </section>

    <!-- SNSセクション -->
    <section id="sns-section" class="sns-section">
      <div class="dark-veil" aria-hidden="true" />
      <div class="sns-content">
        <SecDivider label="Social / SNS" accent="#9baee8" />
        <div class="sns-grid">
          <a
            v-for="link in snsLinks"
            :key="link.label"
            :href="link.href"
            class="sns-btn"
            target="_blank"
            rel="noopener"
          >
            <span class="sns-icon" :style="link.iconStyle">{{ link.icon }}</span>
            <span>{{ link.label }}</span>
          </a>
        </div>
      </div>
    </section>

    <footer class="footer">© mafunity_</footer>
  </div>
</template>

<style scoped>
.page-root {
  position: relative;
  z-index: 1;
}

/* ── ヒーロー ── */
.hero-section {
  position: relative;
  min-height: 64vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 6rem 2rem 4rem;
  overflow: hidden;
}

.aurora-wrap {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.aurora {
  position: absolute;
}

.aurora-1 {
  top: -15%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 90%;
  background: radial-gradient(
    ellipse 65% 55% at 50% 30%,
    rgba(55, 95, 200, 0.13) 0%,
    transparent 70%
  );
}

.aurora-2 {
  top: 5%;
  left: 15%;
  width: 70%;
  height: 75%;
  background: radial-gradient(
    ellipse 50% 40% at 38% 20%,
    rgba(90, 55, 175, 0.09) 0%,
    transparent 65%
  );
}

.aurora-3 {
  top: 8%;
  right: 8%;
  width: 50%;
  height: 65%;
  background: radial-gradient(
    ellipse 42% 35% at 65% 18%,
    rgba(50, 155, 200, 0.07) 0%,
    transparent 60%
  );
}

.accent-dot {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: white;
}

.hero-text {
  position: relative;
  z-index: 2;
}

.hero-subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 10px;
  letter-spacing: 0.5em;
  color: #7bbcd8;
  margin-bottom: 2.2rem;
  opacity: 0.6;
  text-transform: uppercase;
}

.hero-name {
  font-family: 'Noto Serif JP', serif;
  font-weight: 200;
  font-size: clamp(42px, 8vw, 64px);
  letter-spacing: 0.3em;
  color: transparent;
  background: linear-gradient(140deg, #deeeff 0%, #a4ccec 45%, #c0a8ee 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 22px rgba(120, 185, 245, 0.28));
  margin-bottom: 1.2rem;
  line-height: 1.1;
}

.hero-role {
  font-family: 'Noto Serif JP', serif;
  font-size: 13px;
  font-weight: 300;
  color: rgba(148, 192, 222, 0.72);
  letter-spacing: 0.28em;
  margin-bottom: 3.5rem;
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ── パネルセクション ── */
.panels-section {
  position: relative;
}

.panels-content {
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

/* ── SNSセクション ── */
.sns-section {
  position: relative;
}

.sns-content {
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}
</style>
