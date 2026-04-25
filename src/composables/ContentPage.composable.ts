import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { APP_PATH } from '../router'

export interface SiteLinkItem {
  title: string
  sub: string
  url: string
}

export const useContentPageLogic = () => {
  const router = useRouter()

  onMounted(() => {
    window.scrollTo({ top: 0 })
  })

  // 運営サイトのリンク一覧 — url を実際のドメインに変更してください
  const siteLinks: SiteLinkItem[] = [
    {
      title: '謎解きまとめサイト',
      sub: '全国の謎解きイベント・公演情報をまとめた情報サイト。\n開催スケジュール・難易度・レポートを掲載。',
      url: 'https://example.com/nazotoki',
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
