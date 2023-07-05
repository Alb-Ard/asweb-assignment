<template>
    <header class="main-header">
        <h1>Explorer</h1>
    </header>
    <main v-bind:class="!!focusedPlace ? 'place-focused' : ''">
        <div class="places-sidebar-section">
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
import axios from "axios";

const places = [
    {
        name: "Place 0",
        location: [47.41322, -1.219482] as [number, number]
    },
    {
        name: "Place 1",
        location: [47.42022, -1.219482] as [number, number]
    },
    {
        name: "Place 2",
        location: [47.41322, -1.210482] as [number, number]
    }
] as Place[];

const focusedPlaceIndex = ref<number | undefined>(undefined);
const focusedPlace = computed(() => focusedPlaceIndex.value !== undefined ? places[focusedPlaceIndex.value] : undefined);

const setFocusedPlaceIndex = (index: number | undefined) => focusedPlaceIndex.value = index;

onMounted(() => {
    axios.put(location.hostname + ":3001/api/user/register", {
        name: "test",
        email: "foo@bar.com",
        password: "test"
    }).then(response => console.log(response.statusText));
})
</script>

<style scoped>
* {
    --show-place-info-duration: 150ms;
    --header-height: 3rem;
}

main {
    display: grid;
    grid-template-columns: 16rem 1fr;
    height: calc(100svh - var(--header-height));
    transition: grid-template-columns var(--show-place-info-duration) var(--show-place-info-duration) ease-in-out;
}

main.place-focused {
    grid-template-columns: 32rem 1fr;
}

.main-header {
    height: var(--header-height);
}

.places-sidebar-section {
    padding: 1rem;
    overflow-y: scroll;
}

.v-enter-active,
.v-leave-active {
  transition: translate var(--show-place-info-duration) ease-in-out;
}

.v-enter-from,
.v-leave-to {
  translate: -100% 0 0;
}
</style>