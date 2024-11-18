<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CardPokemon from '@/components/CardPokemon.vue';
import { fetchPokemonDetails } from '@/services/pokemonApi';
import { Button } from 'primevue';

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
        <Button @click="goBack" label="Volver a la Pokédex" class="p-button-info" icon="pi pi-angle-left"/>
        <CardPokemon :pokemon="pokemon" />
    </div>
</template>