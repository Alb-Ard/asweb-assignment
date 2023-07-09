<script setup lang="ts">
import { whileLoadingAsync } from "~/lib/dataStore";
import ChartBoard from "~/components/ChartBoard.vue";

const route = useRoute();
const placeId = route.params.id as string;
const authentication = useAuthentication();
const placesStore = usePlacesStore();
const places = computed(() => placesStore.places);
const place = computed(() => places.value?.find(p => p._id === placeId));
const isLoading = ref(false);

onMounted(() => whileLoadingAsync(isLoading, placesStore.fetchOneAsync(placeId), null));
</script>

<template>
    <section>
        <p v-if="!!!place || authentication.userStore.userData === undefined">Loading...</p>
        <p v-else-if="authentication.userStore.userData === null">Login to see your place statistics</p>
        <p v-else-if="authentication.userStore.userData._id !== place.owner._id">Only the owner can see a place statistics!</p>
        <ChartBoard v-else :data="place.reviews.map(r => r.star)"></ChartBoard>
    </section>
</template>

<style scoped>

</style>