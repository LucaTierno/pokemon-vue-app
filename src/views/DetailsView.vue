<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import CardPokemon from '@/components/CardPokemon.vue';

const route = useRoute();
const router = useRouter();
const pokemon = ref(null);

const fetchPokemonDetails = async () => {
    try {
        const id = route.params.id
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        pokemon.value = response.data;
    } catch (error) {
        console.error('Error fetching Pokemon details:', error);
    }
};

const goBack = () => {
    router.push({ name: 'PokedexView' });
};

onMounted(fetchPokemonDetails);
</script>

<template>
    <div class="container mx-auto">
        <button @click="goBack" class="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Volver a la Pokédex
        </button>
        <CardPokemon :pokemon="pokemon"/>
    </div>
</template>