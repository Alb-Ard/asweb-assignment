<template>
    <UserFocusedPlaceSection
        v-if="!!focusedPlace"
        v-bind:place="focusedPlace"
        v-bind:can-edit-review="!isLoading"
        v-on:place-rated="handlePlaceRated"
        v-on:back-pressed="navigateTo('/')"
    />
</template>

<script setup lang="ts">
import { whileLoadingAsync } from "~/lib/dataStore";

const route = useRoute();
const placesStore = usePlacesStore();
const focusedPlace = computed(() => placesStore.places?.find(p => p._id === (route.params.id as string)));
const isLoading = ref(false);

const handlePlaceRated = (star: number) => whileLoadingAsync(isLoading, placesStore.updateReviewAsync(focusedPlace.value!._id, star), false);

definePageMeta({
    key: route => route.fullPath
});
</script>