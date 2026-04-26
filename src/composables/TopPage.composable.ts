import { useRouter } from 'vue-router'
import { APP_PATH } from '../router'

export interface NavPanelItem {
  en: string
  ja: string
  desc: string
  accent: string
  path: string
}

export interface SnsLinkItem {
  icon: string
  label: string
  href: string
  iconStyle?: Record<string, string>
}

export const useTopPageLogic = () => {
  const router = useRouter()

  const navPanels: NavPanelItem[] = [
    {
      en: 'Career',
      ja: '経歴',
      desc: '学歴・職歴・スキルなど経歴の詳細',
      accent: '#7bbcd8',
      path: APP_PATH.CAREER,
    },
    {
      en: 'Achievements',
      ja: '実績',
      desc: '開発プロジェクト・個人開発の実績',
      accent: '#9baee8',
      path: APP_PATH.ACHIEVEMENTS,
    },
    {
      en: 'Travel',
      ja: '旅の記録',
      desc: '国内外の旅の記録と写真、体験のまとめ',
      accent: '#7bc4a0',
      path: APP_PATH.TRAVEL,
    },
    {
      en: 'Content',
      ja: '自作コンテンツ',
      desc: '運営しているオリジナルサイト一覧',
      accent: '#5ecac0',
      path: APP_PATH.CONTENT,
    },
  ]

  const snsLinks: SnsLinkItem[] = [
    { icon: '𝕏', label: '@mafunity_', href: 'https://x.com/mafunity_' },
    {
      icon: 'Q',
      label: 'midwinter222',
      href: 'https://qiita.com/midwinter222',
      iconStyle: { fontFamily: "'Noto Serif JP', serif", fontSize: '13px', fontWeight: '400' },
    },
    { icon: '✦', label: '雑食の真冬さん', href: 'https://tabelog.com/rvwr/midwinter11/', iconStyle: { fontSize: '13px' } },
  ]

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const scrollToSns = () => {
    const el = document.getElementById('sns-section')
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return {
    navPanels,
    snsLinks,
    navigateTo,
    scrollToSns,
  }
}
