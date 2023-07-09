<script setup lang="ts">

import ChartBoard from "~/components/ChartBoard.vue";
import {usePlacesStore} from "~/composables/usePlacesStore";


const id = new URLSearchParams(window.location.search).get("_id");


const authentication = useAuthentication();
const isLoading = ref(false);


const placeStore = usePlacesStore();


const places = computed(() => placeStore.places);


</script>

<template>
    <section>
        <ChartBoard :data="places[places.findIndex(x => x._id === id)].reviews.map(r => r.star)"></ChartBoard>
    </section>
</template>

<style scoped>

</style>