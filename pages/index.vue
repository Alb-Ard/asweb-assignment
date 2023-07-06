<template>
    <main v-bind:class="!!focusedPlace ? 'place-focused' : ''">
        <div class="places-sidebar">
            <Transition mode="out-in">
                <UserPlacesSection
                    v-if="!!!focusedPlace"
                    v-bind:places="places" 
                    v-on:place-focused="setFocusedPlaceIndex" 
                />
                <UserFocusedPlaceSection
                    v-else
                    v-bind:place="focusedPlace"
                    v-on:back-pressed="setFocusedPlaceIndex(undefined)"
                />
            </Transition>
        </div>
        <section>
            <UserPlacesMap 
                v-bind:places="places" 
                v-bind:focused-index="focusedPlaceIndex"
                v-on:place-focused="setFocusedPlaceIndex"
            />
        </section>
    </main>
</template>

<script setup lang="ts">
import Place from "~/lib/types/place";

const places = [
    {
        id: "0",
        name: "Place 0",
        owner: { id: "0", name: "Dave" },
        location: [47.41322, -1.219482] as [number, number],
        photoSrcs: [],
        reviews: [],
    },
    {
        id: "1",
        name: "Place 1",
        owner: { id: "0", name: "Luis" },
        location: [47.42022, -1.219482] as [number, number],
        photoSrcs: [],
        reviews: [],
    },
    {
        id: "2",
        name: "Place 2",
        owner: { id: "0", name: "Rob" },
        location: [47.41322, -1.210482] as [number, number],
        photoSrcs: [],
        reviews: [],
    }
] as Place[];

const focusedPlaceIndex = ref<number | undefined>(undefined);
const focusedPlace = computed(() => focusedPlaceIndex.value !== undefined ? places[focusedPlaceIndex.value] : undefined);

const setFocusedPlaceIndex = (index: number | undefined) => focusedPlaceIndex.value = index;
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