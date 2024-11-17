import DetailsView from '@/views/DetailsView.vue';
import PokedexView from '@/views/PokedexView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'PokedexView',
    component: PokedexView
  },
  {
    path: '/pokemon/:id',
    name: 'DetailsView',
    component: DetailsView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;