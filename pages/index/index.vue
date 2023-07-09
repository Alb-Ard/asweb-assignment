<template>
    <UserPlacesSection
        v-if="!!places"
        v-bind:places="places"
        v-on:request-places="handleRequestPlaces" 
        v-on:place-focused="placeId => navigateTo('/place/' + placeId)"
    />

</template>

<script setup lang="ts">
const placesStore = usePlacesStore();
const places = computed(() => placesStore.places);

definePageMeta({
    key: route => route.fullPath
});

const handleRequestPlaces = () => placesStore.fetchNextAsync();
</script>