import axios from "axios";
import { ref } from "vue";

export const pokemons = ref([]);

export const fetchPokemons = async (number = 20) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${number}`);
    return pokemons.value = response.data.results;
  } catch (error) {
    console.error('Error al obtener los pokémones:', error);
  }
};

export const fetchPokemonDetails = async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
  }
};