import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { APP_PATH } from '../router'
import achievementData from '../resources/achievements/achievement.json'

export interface AchievementItem {
  tag: string
  accent: string
  title: string
  desc: string
}

const mapItems = (tag: string, tagLabel: string, accent: string): AchievementItem[] => {
  const found = achievementData.achievementItem.find((item) => item.tag === tag)
  return (found?.contensts ?? []).map((entry) => ({
    tag: tagLabel,
    accent,
    title: entry.title,
    desc: entry.desc,
  }))
}

export const useAchievementsPageLogic = () => {
  const router = useRouter()

  onMounted(() => {
    window.scrollTo({ top: 0 })
  })

  const eventAchievements = mapItems('event', 'Event', '#7bbcd8')
  const publishAchievements = mapItems('publish', 'Publish', '#9baee8')
  const workAchievements = mapItems('business', '業務実績', '#9baee8')

  const goBack = () => {
    router.push(APP_PATH.ROOT)
  }

  return {
    eventAchievements,
    publishAchievements,
    workAchievements,
    goBack,
  }
}
