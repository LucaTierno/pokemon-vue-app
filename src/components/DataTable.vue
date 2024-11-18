<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { defineProps, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { getTypeColor } from '@/utils/getTypeColor';

const router = useRouter();

const props = defineProps({
    pokemons: {
        type: Array,
        required: true,
    },
});

const pokemonDetails = ref([]);

const getIdFromUrl = (url) => {
    const segments = url.split('/');
    return segments[segments.length - 2];
};

const fetchPokemonDetails = async () => {
    if (props.pokemons.length === 0) return;

    try {
        const details = await Promise.all(
            props.pokemons.map(async (pokemon) => {
                const id = getIdFromUrl(pokemon.url);
                try {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    return {
                        ...pokemon,
                        types: response.data.types.map((type) => type.type.name),
                    };
                } catch (error) {
                    console.error(`Error al obtener los tipos de ${pokemon.name}:`, error);
                    return {
                        ...pokemon,
                        types: [],
                    };
                }
            })
        );
        pokemonDetails.value = details;
        console.log("Lista de tipos", pokemonDetails.value);
    } catch (error) {
        console.error('Error fetching Pokemon details:', error);
    }
};

const navigateToPokemonDetails = (url) => {
    const pokemonId = getIdFromUrl(url)
    if (router && router.push) {
        router.push({ name: 'DetailsView', params: { id: pokemonId } });
    } else {
        console.error('Router no está disponible o no tiene el método push.');
    }
};

onMounted(() => {
    if (props.pokemons.length > 0) {
        fetchPokemonDetails();
    }
});

watch(() => props.pokemons, (newPokemons) => {
    if (newPokemons.length > 0) {
        fetchPokemonDetails();
    }
}, { deep: true });
</script>

<template>
    <DataTable :value="pokemonDetails" tableStyle="min-width: 50rem">
        <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-xl font-bold text-red-600">POKÉDEX</span>
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

        <Column header="Tipos">
            <template #body="slotProps">
                <div>
                    <span v-for="(type, index) in slotProps.data.types" :key="index"
                        :class="['rounded px-2 py-1 mr-1', getTypeColor(type)]">
                        {{ type }}
                    </span>
                </div>
            </template>
        </Column>

        <Column header="Detalles">
            <template #body="slotProps">
                <Button label="Ver" class="p-button-sm p-button-info" icon="pi pi-angle-right" iconPos="right"
                    @click="navigateToPokemonDetails(slotProps.data.url)" />
            </template>
        </Column>
    </DataTable>
</template>