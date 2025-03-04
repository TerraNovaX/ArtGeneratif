import { createRouter, createWebHistory } from 'vue-router';
import WarningPage from '@/components/WarningPage.vue'
import Home from '@/components/Home.vue';
import ArtGeneratif from '@/components/ArtGeneratif.vue';


const routes = [
  {
    path: '/',
    component: WarningPage
  },
  {
    path:'/Home',
    component:  Home
  },
  {
    path:'/Design',
    component: ArtGeneratif
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;