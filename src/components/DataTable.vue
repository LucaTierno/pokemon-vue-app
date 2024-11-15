<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { defineProps } from 'vue';

defineProps({
    pokemons: {
        type: Array,
        required: true,
    },
});

const getIdFromUrl = (url) => {
    const segments = url.split('/');
    return segments[segments.length - 2];
};
</script>

<template>
    <DataTable :value="pokemons" tableStyle="min-width: 50rem">
        <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-xl font-bold text-red-500">POKEDEX</span>
            </div>
        </template>

        <Column header="ID">
            <template #body="slotProps">
                {{ getIdFromUrl(slotProps.data.url) }}
            </template>
        </Column>

        <Column header="Imagen">
            <template #body="slotProps">
                <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getIdFromUrl(slotProps.data.url)}.svg`"
                    :alt="slotProps.data.name" class="w-20 h-20" />
            </template>
        </Column>

        <Column field="name" header="Nombre"></Column>
    </DataTable>
</template>
