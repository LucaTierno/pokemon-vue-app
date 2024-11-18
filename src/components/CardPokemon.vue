<script setup>
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { getTypeColor } from '@/utils/getTypeColor';
import Card from 'primevue/card';
import { defineProps } from 'vue';

defineProps({
    pokemon: {
        type: Object,
        required: true,
    },
});
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