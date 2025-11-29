import { createRouter, createWebHistory } from 'vue-router'
import SubscriptionList from '@/components/SubscriptionList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'subscriptions', component: SubscriptionList },
  ]
})

export default router
