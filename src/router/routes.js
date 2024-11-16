import { createRouter, createWebHistory } from 'vue-router';
import PokedexPage from '@/pages/PokedexPage.vue';
import DetailsPage from '@/pages/DetailsPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PokedexPage
  },
  {
    path: '/pokemon/:id',
    name: 'PokemonDetails',
    component: DetailsPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;