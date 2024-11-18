<script setup>
import { fetchPokemons } from "@/services/pokemonApi";
import { Button, Dialog, InputNumber } from "primevue";
import { ref } from "vue";

const visible = ref(false);
const numberOfPokemons = ref(null);

const capturePokemon = async () => {
    await fetchPokemons(numberOfPokemons.value)
}
</script>

<template>
    <div class="card flex justify-center">
        <Button label="Pokebola" severity="help" icon="pi pi-spin pi-minus-circle" iconPos="right"
            class="p-button-sm p-button-secondary" raised @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Pokebola" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Captura y guarda los Pokémon en la Pokédex
            </span>
            <div class="flex items-center gap-4 mb-4">
                <label for="numberPokemon" class="font-semibold w-24">Número de Pokémon</label>
                <InputNumber id="numberPokemon" v-model="numberOfPokemons" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Capturar" class="p-button-sm" icon="pi pi-spin pi-minus-circle"
                    iconPos="right" @click="() => { capturePokemon(); visible = false; }"></Button>
            </div>
        </Dialog>
    </div>
</template>
