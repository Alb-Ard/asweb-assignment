<template>
    <main>
        <section>
            <ol>
                <li v-for="(place, placeIndex) in places">
                    <button v-on:click="focusedPlaceIndex = placeIndex">
                        {{ place.name }}
                    </button>
                </li>
            </ol>
        </section>
        <section>
            <PlacesMap 
                v-bind:places="places.map(p => p.location)" 
                v-bind:focused-index="focusedPlaceIndex"
                v-on:place-focused="index => focusedPlaceIndex = index"
            />
        </section>
    </main>
</template>

<script setup lang="ts">
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
];

const focusedPlaceIndex = ref<number | undefined>(undefined);
</script>

<style scoped>
main {
    display: grid;
    grid-template-columns: 6rem 1fr;
}
</style>