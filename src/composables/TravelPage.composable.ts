import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { APP_PATH } from '../router'

export interface TravelSiteLinkItem {
  title: string
  sub: string
  url: string
}

export const useTravelPageLogic = () => {
  const router = useRouter()

  onMounted(() => {
    window.scrollTo({ top: 0 })
  })

  // 旅日記サイトのリンク一覧 — url を実際のドメインに変更してください
  const siteLinks: TravelSiteLinkItem[] = [
    {
      title: '旅日記サイト',
      sub: '国内外の旅の記録と写真、コラムをまとめた個人サイト。\n旅先での発見や体験を綴っています。',
      url: 'https://example.com/travel',
    },
  ]

  const goBack = () => {
    router.push(APP_PATH.ROOT)
  }

  return {
    siteLinks,
    goBack,
  }
}
