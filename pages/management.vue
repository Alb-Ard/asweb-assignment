<script setup lang="ts">
import { PlaceReview } from "~/lib/types/place";
import { initializeIfEmptyAsync, whileLoadingAsync } from "~/lib/dataStore";
import Createplace from "~/components/createplace.vue";


const authentication = useAuthentication();
const placeStore = usePlacesStore();
const places = computed(() => placeStore.places?.filter(p => p.owner._id === authentication.userStore.userData?._id));
const isLoading = ref(false);

function placeByMeanReview(reviews: PlaceReview[]): number {
    return reviews.reduce((s, v) => s + v.star, 0) / reviews.length;
}

function concatPathWithPlaceId(id: string): string {
    return "/dashboard/" + id;
}

watch(authentication.userStore, newUserStore => { !!newUserStore.userData && whileLoadingAsync(isLoading, initializeIfEmptyAsync(() => placeStore.places, placeStore), null); }, { immediate: true });
</script>

<template>
    <p v-if="!!!places || authentication.userStore.userData === undefined">Loading...</p>
    <p v-else-if="authentication.userStore.userData === null">Please log in to enter manager mode!</p>
    <template v-else>
        <header>
            <h2>Welcome back, {{ authentication.userStore.userData?.username }}</h2>
        </header>
        <h3>Your places:</h3>
        <UserPlacesSection 
            v-bind:places="places"
            class="place-list-section"
            list-class="place-list"
            v-on:request-places="placeStore.fetchNextAsync()" 
            v-on:place-focused="id => navigateTo('/dashboard/' + id)" 
        />
    </template>
    <!-- commentato perchè altrimenti mi sparo-->
    <!--<createplace></createplace>-->
    <deleteplace></deleteplace>

</template>
<style scoped>
h2 {
  text-align: center;
  color: var(--color-on-400);
  font-size: 1.5rem;
}

h3 {
  text-align: center;
  margin-bottom: 2rem;
}

header {
  background-color: var(--color-primary-400);
  padding: 1rem;
  margin-bottom: 2rem;
}

li {
    list-style-type: none;
}

.place-list-section {
  width: min(90vw, 72rem);
  margin-inline: auto;
}

:deep(.place-list) {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media screen and (width <= 1024px) {
    .place-list {
        grid-template-columns: 1fr 1fr;
    }
}

@media screen and (width <= 512px) {
    .place-list {
        grid-template-columns: 1fr;
    }
}

</style>