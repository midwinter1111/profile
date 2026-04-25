import { createRouter, createWebHistory } from 'vue-router'
import TopPage from '../views/TopPage.vue'
import CareerPage from '../views/CareerPage.vue'
import AchievementsPage from '../views/AchievementsPage.vue'
import TravelPage from '../views/TravelPage.vue'
import ContentPage from '../views/ContentPage.vue'
import SamplePage from '../views/SamplePage.vue'
import ErrorPage from '../views/ErrorPage.vue'

/**
 * アプリケーション内のパス定義
 * コンポーネント側で router.push(APP_PATH.CAREER) のように利用します
 */
export const APP_PATH = {
  ROOT: '/',
  CAREER: '/career',
  ACHIEVEMENTS: '/achievements',
  TRAVEL: '/travel',
  CONTENT: '/content',
  SAMPLE: '/sample',
  ERROR: '/error',
} as const

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: APP_PATH.ROOT,
      name: 'home',
      component: TopPage,
    },
    {
      path: APP_PATH.CAREER,
      name: 'career',
      component: CareerPage,
    },
    {
      path: APP_PATH.ACHIEVEMENTS,
      name: 'achievements',
      component: AchievementsPage,
    },
    {
      path: APP_PATH.TRAVEL,
      name: 'travel',
      component: TravelPage,
    },
    {
      path: APP_PATH.CONTENT,
      name: 'content',
      component: ContentPage,
    },
    {
      path: APP_PATH.SAMPLE,
      name: 'sample',
      component: SamplePage,
    },
    {
      path: APP_PATH.ERROR,
      name: 'error',
      component: ErrorPage,
    },
    // 定義外のURLにアクセスされた場合もエラー画面へ飛ばす設定
    {
      path: '/:pathMatch(.*)*',
      redirect: APP_PATH.ERROR,
    },
  ],
})

export default router
