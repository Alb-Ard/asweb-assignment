<script setup lang="ts">
import {usePlacesStore} from "~/composables/usePlacesStore";
import {initializeIfEmptyAsync, whileLoadingAsync} from "~/lib/dataStore";

const authentication = useAuthentication();
const isLoading = ref(false);
const placeStore = usePlacesStore();
const places = computed(() => placeStore.places?.filter(p => p.owner._id === authentication.userStore.userData?._id));

watch(authentication.userStore, newUserStore => { !!newUserStore.userData && whileLoadingAsync(isLoading, initializeIfEmptyAsync(() => placeStore.places, placeStore), null); }, { immediate: true });
</script>

<template>
    <p v-if="authentication.userStore.userData === undefined">Loading...</p>
    <p v-else-if="authentication.userStore.userData === null">Please log in to enter manager mode!</p>
    <template v-else>
        <header>
            <h2>Welcome back, {{ authentication.userStore.userData?.username }}</h2>
        </header>
        <h3>Your places:</h3>
        <div class="card-list">
            <div class="card-list-element" v-for="place in places">
                <PlaceCard 
                    :image="place.photoSrcs.at(0) ?? ''" 
                    :name="place.name"
                    :star-rating="place.reviews.reduce((p, c) => p + c.star, 0) / place.reviews.length" 
                    to="/dashboard"
                >
                </PlaceCard>
            </div>
        </div>
    </template>
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

.card-list {
  width: min(90vw, 72rem);
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media screen and (width <= 1024px) {
    .card-list {
        grid-template-columns: 1fr 1fr;
    }
}

@media screen and (width <= 512px) {
    .card-list {
        grid-template-columns: 1fr;
    }
}

</style>