<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { feature } from 'topojson-client'
import { geoArea, geoMercator, geoPath } from 'd3-geo'

export interface PrefectureData {
  id: string
  name: string
  hasPhoto: boolean
  photoUrl: string
}

const props = defineProps<{
  prefectures: PrefectureData[]
}>()

const emit = defineEmits<{
  prefectureClick: [prefecture: PrefectureData]
}>()

// topojson の nam_ja → composable の ID へのマッピング
const NAME_TO_ID: Record<string, string> = {
  北海道: 'hokkaido',
  青森県: 'aomori',
  岩手県: 'iwate',
  宮城県: 'miyagi',
  秋田県: 'akita',
  山形県: 'yamagata',
  福島県: 'fukushima',
  茨城県: 'ibaraki',
  栃木県: 'tochigi',
  群馬県: 'gunma',
  埼玉県: 'saitama',
  千葉県: 'chiba',
  東京都: 'tokyo',
  神奈川県: 'kanagawa',
  新潟県: 'niigata',
  富山県: 'toyama',
  石川県: 'ishikawa',
  福井県: 'fukui',
  山梨県: 'yamanashi',
  長野県: 'nagano',
  岐阜県: 'gifu',
  静岡県: 'shizuoka',
  愛知県: 'aichi',
  三重県: 'mie',
  滋賀県: 'shiga',
  京都府: 'kyoto',
  大阪府: 'osaka',
  兵庫県: 'hyogo',
  奈良県: 'nara',
  和歌山県: 'wakayama',
  鳥取県: 'tottori',
  島根県: 'shimane',
  岡山県: 'okayama',
  広島県: 'hiroshima',
  山口県: 'yamaguchi',
  徳島県: 'tokushima',
  香川県: 'kagawa',
  愛媛県: 'ehime',
  高知県: 'kochi',
  福岡県: 'fukuoka',
  佐賀県: 'saga',
  長崎県: 'nagasaki',
  熊本県: 'kumamoto',
  大分県: 'oita',
  宮崎県: 'miyazaki',
  鹿児島県: 'kagoshima',
  沖縄県: 'okinawa',
}

const SVG_W = 800
const SVG_H = 1100

const prefPaths = ref<Record<string, string>>({})
const okinawaInsetPath = ref<string>('')
const isLoading = ref(true)
const hasError = ref(false)

// 沖縄インセットボックスの位置・サイズ (SVG座標)
const INSET_X = 500
const INSET_Y = 875
const INSET_W = 190
const INSET_H = 130

const prefectureMap = computed(() =>
  Object.fromEntries(props.prefectures.map((p) => [p.id, p])),
)

const renderedPrefectures = computed(() =>
  Object.entries(prefPaths.value).map(([id, path]) => ({
    id,
    path,
    ...(prefectureMap.value[id] ?? { name: id, hasPhoto: false, photoUrl: '' }),
  })),
)

onMounted(async () => {
  try {
    const res = await fetch('/japan.topojson')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topo: any = await res.json()

    const objectKey = Object.keys(topo.objects)[0]

    // Mercator投影: 北海道が見切れないよう中心を下寄りに配置
    const projection = geoMercator()
      .center([136, 36])
      .scale(2200)
      .translate([SVG_W / 2, SVG_H * 0.55])
    const pathGen = geoPath(projection)

    // 沖縄インセット用投影: 本島中心を右下インセットボックス中央に配置
    const insetProjection = geoMercator()
      .center([128, 26.5])
      .scale(4000)
      .translate([INSET_X + INSET_W / 2, INSET_Y + INSET_H / 2])
    const insetPathGen = geoPath(insetProjection)

    // topojson は都道府県単位（47件）なので feature() で直接変換
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const geojson = feature(topo, topo.objects[objectKey]) as any
    for (const feat of geojson.features) {
      const prefName: string = feat.properties?.nam_ja ?? ''
      const id = NAME_TO_ID[prefName]
      if (!id) continue

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let geometry: any = feat.geometry

      if (id === 'okinawa') {
        // 沖縄: 最大ポリゴン（本島）のみインセット投影で描画
        if (geometry.type === 'MultiPolygon') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const parts = (geometry.coordinates as any[][]).map((coords: any[]) => ({
            coords,
            area: geoArea({ type: 'Polygon', coordinates: coords }),
          }))
          const largest = parts.reduce((a, b) => (a.area > b.area ? a : b))
          geometry = { type: 'MultiPolygon', coordinates: [largest.coords] }
        }
        const d = insetPathGen(geometry)
        if (d) okinawaInsetPath.value = d
      } else {
        // その他: 最大ポリゴン面積の12%未満の離島を除外
        if (geometry.type === 'MultiPolygon') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const parts = (geometry.coordinates as any[][]).map((coords: any[]) => ({
            coords,
            area: geoArea({ type: 'Polygon', coordinates: coords }),
          }))
          const maxArea = Math.max(...parts.map((p) => p.area))
          const filtered = parts.filter((p) => p.area >= maxArea * 0.12)
          geometry = { type: 'MultiPolygon', coordinates: filtered.map((p) => p.coords) }
        }
        const d = pathGen(geometry)
        if (d) prefPaths.value[id] = d
      }
    }

    isLoading.value = false
  } catch (e) {
    console.error('[JapanMap] 地図データ読み込みエラー:', e)
    hasError.value = true
    isLoading.value = false
  }
})

const hoveredId = ref<string | null>(null)
const tooltipStyle = ref({ left: '0px', top: '0px', display: 'none' })

const handleMouseMove = (e: MouseEvent, id: string) => {
  hoveredId.value = id
  const rect = (e.currentTarget as Element).closest('.map-wrapper')!.getBoundingClientRect()
  tooltipStyle.value = {
    left: `${e.clientX - rect.left + 14}px`,
    top: `${e.clientY - rect.top - 32}px`,
    display: 'block',
  }
}

const handleMouseLeave = () => {
  hoveredId.value = null
  tooltipStyle.value = { left: '0px', top: '0px', display: 'none' }
}

const prefFill = (hasPhoto: boolean) => (hasPhoto ? '#7bc4a0' : '#2a3a4a')
const prefHoverFill = (hasPhoto: boolean) => (hasPhoto ? '#a0d8c0' : '#3a5060')
</script>

<template>
  <div class="map-wrapper">
    <!-- 読み込み中 -->
    <div v-if="isLoading" class="map-state">
      <span class="map-state-text">地図を読み込み中...</span>
    </div>

    <!-- エラー -->
    <div v-else-if="hasError" class="map-state">
      <span class="map-state-text">地図の読み込みに失敗しました</span>
    </div>

    <!-- マップ本体 -->
    <svg
      v-else
      :viewBox="`0 0 ${SVG_W} ${SVG_H}`"
      xmlns="http://www.w3.org/2000/svg"
      class="japan-map-svg"
      @mouseleave="handleMouseLeave"
    >
      <path
        v-for="pref in renderedPrefectures"
        :key="pref.id"
        :d="pref.path"
        :fill="hoveredId === pref.id ? prefHoverFill(pref.hasPhoto) : prefFill(pref.hasPhoto)"
        stroke="rgba(100,160,200,0.2)"
        stroke-width="0.5"
        class="pref-path"
        @click="emit('prefectureClick', pref)"
        @mousemove="(e) => handleMouseMove(e, pref.id)"
      />

      <!-- 沖縄インセット (右下・省略表現) -->
      <g v-if="okinawaInsetPath">
        <rect
          :x="INSET_X" :y="INSET_Y" :width="INSET_W" :height="INSET_H"
          fill="none"
          stroke="rgba(100,160,200,0.25)"
          stroke-width="0.5"
          stroke-dasharray="4,3"
        />
        <path
          :d="okinawaInsetPath"
          :fill="hoveredId === 'okinawa'
            ? prefHoverFill(prefectureMap['okinawa']?.hasPhoto ?? false)
            : prefFill(prefectureMap['okinawa']?.hasPhoto ?? false)"
          stroke="rgba(100,160,200,0.2)"
          stroke-width="0.5"
          class="pref-path"
          @click="emit('prefectureClick', prefectureMap['okinawa'] ?? { id: 'okinawa', name: '沖縄', hasPhoto: false, photoUrl: '' })"
          @mousemove="(e) => handleMouseMove(e, 'okinawa')"
        />
      </g>
    </svg>

    <!-- ホバー時ツールチップ -->
    <div class="map-tooltip" :style="tooltipStyle">
      {{ hoveredId ? (prefectureMap[hoveredId]?.name ?? '') : '' }}
    </div>
  </div>
</template>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
}

.japan-map-svg {
  width: 100%;
  max-width: 560px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.pref-path {
  cursor: pointer;
  transition: fill 0.15s ease;
}

.map-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 360px;
  max-width: 560px;
  margin: 0 auto;
}

.map-state-text {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12px;
  color: rgba(100, 160, 200, 0.45);
  letter-spacing: 0.1em;
}

.map-tooltip {
  position: absolute;
  background: rgba(10, 18, 40, 0.9);
  border: 1px solid rgba(100, 160, 210, 0.3);
  color: #c8e0f0;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 11px;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 2px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 10;
}
</style>
