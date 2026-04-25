import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { APP_PATH } from '../router'
import timelineData from '../resources/career/timeline.json'
import certificationData from '../resources/career/certification.json'
import rewardsData from '../resources/career/rewards.json'

export interface CareerItem {
  year: string
  title: string
  desc: string
}

export interface SkillCategory {
  cat: string
  skills: string[]
}

export const useCareerPageLogic = () => {
  const router = useRouter()

  onMounted(() => {
    window.scrollTo({ top: 0 })
  })

  const timelineItems: CareerItem[] = timelineData.timelineItem
  const certificationItems: CareerItem[] = certificationData.certificationItem
  const rewardItems: CareerItem[] = rewardsData.rewardItem

  const skillCategories: SkillCategory[] = [
    { cat: 'Backend', skills: ['Go', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'] },
    { cat: 'Frontend', skills: ['React', 'Next.js', 'CSS / Tailwind'] },
    { cat: 'Infrastructure', skills: ['Docker', 'AWS', 'Vercel', 'GitHub Actions'] },
  ]

  const goBack = () => {
    router.push(APP_PATH.ROOT)
  }

  return {
    timelineItems,
    certificationItems,
    rewardItems,
    skillCategories,
    goBack,
  }
}
