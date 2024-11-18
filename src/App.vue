<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { fetchPokemons } from './services/pokemonApi';

const pokemons = ref([]);

onMounted(async () => {
  pokemons.value = await fetchPokemons();
});
</script>

<template>
  <RouterView :pokemons="pokemons"></RouterView>
</template>
