<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CardPokemon from '@/components/CardPokemon.vue';
import { fetchPokemonDetails } from '@/services/pokemonApi';

const route = useRoute();
const router = useRouter();
const pokemon = ref(null);

const PokemonId = route.params.id

const goBack = () => {
    router.push({ name: 'PokedexView' });
};

onMounted(async () => {
    pokemon.value = await fetchPokemonDetails(PokemonId)
});
</script>

<template>
    <div class="container mx-auto">
        <button @click="goBack" class="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Volver a la Pokédex
        </button>
        <CardPokemon :pokemon="pokemon" />
    </div>
</template>