<script setup>
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import Card from 'primevue/card';
import { defineProps } from 'vue';

defineProps({
    pokemon: {
        type: Object,
        required: true,
    },
});

const getTypeColor = (type) => {
    const colors = {
        normal: 'bg-gray-400',
        fire: 'bg-red-500',
        water: 'bg-blue-500',
        electric: 'bg-yellow-400',
        grass: 'bg-green-500',
        ice: 'bg-blue-200',
        fighting: 'bg-red-700',
        poison: 'bg-purple-500',
        ground: 'bg-yellow-600',
        flying: 'bg-indigo-400',
        psychic: 'bg-pink-500',
        bug: 'bg-green-400',
        rock: 'bg-yellow-700',
        ghost: 'bg-purple-700',
        dragon: 'bg-indigo-700',
        dark: 'bg-gray-700',
        steel: 'bg-gray-400',
        fairy: 'bg-pink-300'
    };
    return colors[type] || 'bg-gray-400';
};
</script>

<template>
    <Card class="w-[25rem] m-auto">
        <template #header>
            <img :src="pokemon?.sprites.other.dream_world.front_default" :alt="pokemon?.name"
                class="w-full h-56 object-contain p-4" />
        </template>
        <template #title>Pokémon - {{ capitalizeFirstLetter(pokemon?.name || '') }}</template>
        <template #content>
            <div class="mb-4">
                <h3 class="text-lg font-semibold mb-2">Tipo:</h3>
                <div class="flex gap-2">
                    <span v-for="type in pokemon?.types" :key="type.slot"
                        :class="['px-2 py-1 rounded text-white', getTypeColor(type.type.name)]">
                        {{ capitalizeFirstLetter(type.type.name || '') }}
                    </span>
                </div>
            </div>

            <div class="mb-4">
                <h3 class="text-lg font-semibold mb-2">Rasgos físicos:</h3>
                <p>Altura: {{ pokemon?.height / 10 }} m</p>
                <p>Peso: {{ pokemon?.weight / 10 }} kg</p>
            </div>

            <div class="mb-4">
                <h3 class="text-lg font-semibold mb-2">Habilidades:</h3>
                <ul class="list-disc list-inside">
                    <li v-for="ability in pokemon?.abilities" :key="ability.slot">
                        {{ capitalizeFirstLetter(ability.ability.name || '')}}
                    </li>
                </ul>
            </div>
        </template>
    </Card>
</template>