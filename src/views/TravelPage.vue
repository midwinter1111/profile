<script setup lang="ts">
import { useTravelPageLogic } from '../composables/TravelPage.composable'
import JapanMap from '../components/JapanMap.vue'

const { prefectures, popupPrefecture, handlePrefectureClick, closePopup, goBack } =
  useTravelPageLogic()
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

      <div class="map-section">
        <JapanMap :prefectures="prefectures" @prefecture-click="handlePrefectureClick" />

        <div class="map-legend">
          <div class="legend-item">
            <span class="legend-dot visited" />
            <span class="legend-label">踏破済み</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot unvisited" />
            <span class="legend-label">未踏破</span>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">© mafunity_</footer>
  </div>

  <!-- 未訪問ポップアップ -->
  <Transition name="popup-fade">
    <div v-if="popupPrefecture" class="popup-overlay" @click.self="closePopup">
      <div class="popup-card">
        <div class="popup-pref">{{ popupPrefecture.name }}</div>
        <p class="popup-message">まだ行ったことがありません</p>
        <button class="popup-close" @click="closePopup">閉じる</button>
      </div>
    </div>
  </Transition>
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

.map-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
}

.map-legend {
  display: flex;
  gap: 1.6rem;
  align-items: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-dot.visited {
  background: #7bc4a0;
}

.legend-dot.unvisited {
  background: #2a3a4a;
  border: 1px solid rgba(100, 160, 200, 0.3);
}

.legend-label {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 11px;
  color: rgba(130, 175, 205, 0.65);
  letter-spacing: 0.06em;
}

.map-hint {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 10px;
  color: rgba(100, 150, 185, 0.4);
  letter-spacing: 0.06em;
  text-align: center;
}

/* ── ポップアップ ── */
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 6, 14, 0.72);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-card {
  background: rgba(10, 18, 42, 0.95);
  border: 1px solid rgba(123, 196, 160, 0.3);
  border-radius: 3px;
  padding: 2.4rem 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.popup-pref {
  font-family: 'Noto Serif JP', serif;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0.22em;
  color: #7bc4a0;
}

.popup-message {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 13px;
  color: rgba(180, 210, 230, 0.75);
  letter-spacing: 0.1em;
}

.popup-close {
  margin-top: 0.4rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 12px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(123, 196, 160, 0.6);
  background: none;
  border: 1px solid rgba(123, 196, 160, 0.25);
  border-radius: 2px;
  padding: 0.4rem 1.4rem;
  cursor: pointer;
  transition: all 0.2s;
}

.popup-close:hover {
  color: #7bc4a0;
  border-color: rgba(123, 196, 160, 0.6);
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.2s ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .map-legend {
    flex-direction: column;
    gap: 0.8rem;
  }

  .popup-card {
    padding: 2rem 1.8rem;
    margin: 0 1.5rem;
  }
}
</style>
