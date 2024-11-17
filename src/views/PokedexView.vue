<script setup>
import DataTable from '@/components/DataTable.vue';
import { defineProps } from 'vue';

defineProps({
  pokemons: {
    type: Array,
    required: true,
  },
});
</script>

<template>
    <DataTable :pokemons="pokemons"/>
</template>