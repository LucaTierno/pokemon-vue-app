<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { ref, onMounted, watch } from "vue";
import { pokemons } from "@/services/pokemonApi";
import axios from "axios";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { getTypeColor } from "@/utils/getTypeColor";
import DialogLoadPokemons from "./DialogLoadPokemons.vue";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const router = useRouter();
const pokemonDetails = ref([]);
const loading = ref(false);
const totalRecords = ref(0);
const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});

const getIdFromUrl = (url) => {
    const segments = url.split("/");
    return segments[segments.length - 2];
};

const fetchPokemonDetails = async () => {
    if (pokemons.value.length === 0) return;

    loading.value = true;
    try {
        const start = lazyParams.value.first;
        const end = start + lazyParams.value.rows;
        const pokemonsToFetch = pokemons.value.slice(start, end);

        const details = await Promise.all(
            pokemonsToFetch.map(async (pokemon) => {
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
        totalRecords.value = pokemons.value.length;
    } catch (error) {
        console.error("Error fetching Pokemon details:", error);
    } finally {
        loading.value = false;
    }
};

const navigateToPokemonDetails = (url) => {
    const pokemonId = getIdFromUrl(url);
    router.push({ name: "DetailsView", params: { id: pokemonId } });
};

const onPage = (event) => {
    lazyParams.value = event;
    fetchPokemonDetails();
};

onMounted(() => {
    if (pokemons.value.length > 0) {
        fetchPokemonDetails();
    }
});

watch(pokemons, (newPokemons) => {
    if (newPokemons.length > 0) {
        fetchPokemonDetails();
    }
});

const paginatorRight = `${totalRecords.value} Pokémon en total`;
</script>

<template>
    <DataTable 
        :value="pokemonDetails" 
        :lazy="true"
        :paginator="true"
        :rows="10"
        :totalRecords="totalRecords"
        :loading="loading"
        @page="onPage"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        :rowsPerPageOptions="[10,20,50]"
        responsiveLayout="scroll"
        tableStyle="min-width: 50rem"
    >
        <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-xl font-bold text-red-600">POKÉDEX</span>
                <DialogLoadPokemons />
            </div>
        </template>

        <template #paginatorLeft>
            {{ paginatorLeft }}
        </template>
        <template #paginatorRight>
            {{ paginatorRight }}
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

        <Column field="name" header="Nombre">
            <template #body="slotProps">
                {{ capitalizeFirstLetter(slotProps.data.name) }}
            </template>
        </Column>

        <Column header="Tipos">
            <template #body="slotProps">
                <div>
                    <span
                        v-for="(type, index) in slotProps.data.types"
                        :key="index"
                        :class="['rounded px-2 py-1 mr-1', getTypeColor(type)]"
                    >
                        {{ capitalizeFirstLetter(type) }}
                    </span>
                </div>
            </template>
        </Column>

        <Column header="Detalles">
            <template #body="slotProps">
                <Button
                    label="Ver"
                    class="p-button-sm p-button-info"
                    icon="pi pi-angle-right"
                    iconPos="right"
                    @click="navigateToPokemonDetails(slotProps.data.url)"
                />
            </template>
        </Column>
    </DataTable>
</template>