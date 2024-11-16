<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { RouterView } from 'vue-router';

const pokemons = ref([]);

const fetchPokemons = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    pokemons.value = response.data.results;
  } catch (error) {
    console.error('Error al obtener los pokémones:', error);
  }
};

onMounted(() => {
  fetchPokemons();
});
</script>

<template>
  <RouterView :pokemons="pokemons"></RouterView>
</template>
