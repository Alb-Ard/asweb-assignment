<template>
    <section>
        <header>
            <h2>Places</h2>
        </header>
        <ol>
            <li v-for="(place, placeIndex) in places">
                <Button v-bind:full-width="true" v-on:click="handlePlaceClicked(placeIndex)">
                    {{ place.name }}
                    <img v-bind:src="`https://picsum.photos/id/${placeIndex + 100}/200`" />
                </Button>
            </li>
        </ol>
    </section>
</template>

<script setup lang="ts">
import Place from "~/lib/types/place";

const { places } = defineProps<{
    places: Place[],
}>();

const emit = defineEmits<{
    (event: "placeFocused", placeIndex: number): void
}>();

const handlePlaceClicked = (placeIndex: number) => emit("placeFocused", placeIndex);
</script>

<style scoped>
ol, li {
    width: 100%;
}

li {
    list-style-type: none;
}

li:where(:not(:last-of-type)) {
    margin-bottom: 1rem;
}

img {
    margin-top: 0.5rem;
    max-width: 100%;
}
</style>