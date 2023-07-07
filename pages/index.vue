<template>
    <main 
        v-if="!!places"
        v-bind:class="{ 'place-focused': !!focusedPlace }"
    >
        <div class="places-sidebar">
            <Transition mode="out-in">
                <UserPlacesSection
                    v-if="!!!focusedPlace"
                    v-bind:places="places"
                    v-on:request-places="handleRequestPlaces" 
                    v-on:place-focused="handlePlaceFocused"
                />
                <UserFocusedPlaceSection
                    v-else
                    v-bind:place="focusedPlace"
                    v-on:back-pressed="handlePlaceFocused(undefined)"
                />
            </Transition>
        </div>
        <section>
            <UserPlacesMap 
                v-bind:places="places" 
                v-bind:focused-index="focusedPlaceId"
                v-on:place-focused="handlePlaceFocused"
            />
        </section>
    </main>
</template>

<script setup lang="ts">
import { initializeIfEmpty } from "~/lib/dataStore";

const placesStore = usePlacesStore();
const places = computed(() => placesStore.places);
const focusedPlaceId = ref<string>();
const focusedPlace = computed(() => focusedPlaceId.value !== undefined && !!places.value ? places.value.find(p => p.id === focusedPlaceId.value) : undefined);

const handleRequestPlaces = () => placesStore.fetchNextAsync();
const handlePlaceFocused = (id: string | undefined) => focusedPlaceId.value = id;

onMounted(() => initializeIfEmpty(() => placesStore.places, placesStore));
</script>

<style scoped>
* {
    --show-place-info-duration: 150ms;
}

main {
    display: grid;
    height: 100%;
    grid-template-columns: 16rem 1fr;
    transition: grid-template-columns var(--show-place-info-duration) var(--show-place-info-duration) ease-in-out;
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