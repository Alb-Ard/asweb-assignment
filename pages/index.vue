<template>
    <main 
        v-if="!!places"
        v-bind:class="!!focusedPlace ? 'place-focused' : ''"
    >
        <div v-bind:class="['places-sidebar']">
            <NuxtPage />
        </div>
        <section>
            <UserPlacesMap 
                v-bind:places="places" 
                v-bind:focused-id="focusedPlaceId"
                v-on:place-focused="placeId => navigateTo('/place/' + placeId)"
            />
        </section>
    </main>
</template>

<script setup lang="ts">
import { initializeIfEmptyAsync } from "~/lib/dataStore";

const route = useRoute();
const placesStore = usePlacesStore();
const places = computed(() => placesStore.places);
const focusedPlaceId = computed(() => route.params.id as string);
const focusedPlace = computed(() => focusedPlaceId.value !== undefined && !!places.value ? places.value.find(p => p._id === focusedPlaceId.value) : undefined);

onMounted(() => initializeIfEmptyAsync(() => placesStore.places, placesStore));
</script>

<style scoped>
* {
    --show-place-info-duration: 150ms;
}

main {
    display: grid;
    height: 100%;
    grid-template-columns: 16rem 1fr;
    transition: grid-template-columns var(--show-place-info-duration) ease-in-out;
}

main.place-focused {
    grid-template-columns: 32rem 1fr;
}

section,
.places-sidebar {
    height: 100%;
}

.places-sidebar {
    padding: 1rem;
    overflow: auto;
}

.v-enter-active,
.v-leave-active {
  transition: translate var(--show-place-info-duration) ease-in-out;
}

.v-enter-from,
.v-leave-to {
  translate: -100% 0 0;
}

@media screen and (width <= 1024px) {
    main {
        grid-template-columns: 0 1fr;
    }

    main.place-focused {
        grid-template-columns: 1fr 0;
    }
}
</style>