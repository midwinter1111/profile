import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { APP_PATH } from '../router'
import prefectureData from '../resources/travel/prefectures.json'
import type { PrefectureData } from '../components/JapanMap.vue'

export const useTravelPageLogic = () => {
  const router = useRouter()

  onMounted(() => {
    window.scrollTo({ top: 0 })
  })

  const prefectures: PrefectureData[] = prefectureData.prefectures.map((p) => ({
    ...p,
    hasPhoto: Boolean(p.photoUrl),
  }))

  const popupPrefecture = ref<PrefectureData | null>(null)

  const handlePrefectureClick = (prefecture: PrefectureData) => {
    if (prefecture.hasPhoto) {
      window.open(prefecture.photoUrl, '_blank', 'noopener')
    } else {
      popupPrefecture.value = prefecture
    }
  }

  const closePopup = () => {
    popupPrefecture.value = null
  }

  const goBack = () => {
    router.push(APP_PATH.ROOT)
  }

  return {
    prefectures,
    popupPrefecture,
    handlePrefectureClick,
    closePopup,
    goBack,
  }
}
