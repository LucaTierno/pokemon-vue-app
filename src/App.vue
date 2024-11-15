<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import PokedexPage from './pages/PokedexPage.vue';
  
  const pokemons = ref(null);
  
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
  <PokedexPage :pokemons="pokemons" />
</template>


