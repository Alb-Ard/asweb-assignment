<script setup lang="ts">
import { whileLoadingAsync } from "~/lib/dataStore";
import ChartBoard from "~/components/ChartBoard.vue";

const route = useRoute();
const placeId = route.params.id as string;
const authentication = useAuthentication();
const placesStore = usePlacesStore();
const places = computed(() => placesStore.places);
const place = computed(() => places.value?.find(p => p._id === placeId));
const averagePlaceRating = computed(() => !!place.value ? (place.value.reviews.reduce((p, c) => p + c.star, 0)) / place.value.reviews.length : 0);
const isLoading = ref(false);

const convertDataToChartValues = (ratings: number[]) => ratings.reduce((v, r) => { v[r]++; return v; }, [0, 0, 0, 0, 0]);

onMounted(() => whileLoadingAsync(isLoading, placesStore.fetchOneAsync(placeId), null));
</script>

<template>
    <section>
        <p v-if="!!!place || authentication.userStore.userData === undefined">Loading...</p>
        <p v-else-if="authentication.userStore.userData === null">Login to see your place statistics</p>
        <p v-else-if="authentication.userStore.userData._id !== place.owner._id">Only the owner can see a place statistics!</p>
        <template v-else>
            <header>
                <h2>{{ place.name }}</h2>
                <p>Statistics:</p>
            </header>
            <p v-if="place.reviews.length <= 0" class="statistic-paragraph">This place doesn't have any reviews yet</p>
            <template v-else>
                <ChartBoard :data="convertDataToChartValues(place.reviews.map(r => r.star))"></ChartBoard>
                <p class="statistic-paragraph">Average rating: {{ averagePlaceRating.toFixed(2) }} <StarRating :rating="averagePlaceRating" /></p>
                <p class="statistic-paragraph">Ratings count: {{ place.reviews.length }}</p>
            </template>
        </template>
    </section>
</template>

<style scoped>
header {
    background-color: var(--color-primary-400);
    padding: 1rem;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--color-on-400);
}

p {
    margin-top: 2rem;
    font-size: 1.1rem;
}

.statistic-paragraph {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
}
</style>