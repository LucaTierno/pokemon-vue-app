<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { fetchPokemons } from './services/pokemonApi';

onMounted(async () => {
  await fetchPokemons();
});
</script>

<template>
  <RouterView></RouterView>
</template>
