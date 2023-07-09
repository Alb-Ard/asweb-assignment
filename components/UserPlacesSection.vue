<template>
    <section>
        <header>
            <h2>Places</h2>
        </header>
        <label for="searchPlaceName">Search by name:</label>
        <input type="text" id="searchPlaceName" placeholder="Search..." v-on:input="handleInputModified" />
        <ol v-if="filteredPlaces.length > 0" v-bind:class="listClass">
            <li 
                v-for="place in filteredPlaces"
                v-bind:key="place._id"
                v-intersection-observer="handleObservedPlacesChanged"
            >
                <PlaceCard 
                    v-bind:name="place.name"
                    v-bind:image="place.photoSrcs.at(0)"
                    v-bind:star-rating="place.reviews.reduce((p, c) => p + c.star, 0) / place.reviews.length"
                    v-on:click="e => { e.preventDefault(); handlePlaceClicked(place._id) }"
                />
            </li>
        </ol>
        <p v-else>No places found!</p>
    </section>
</template>

<script setup lang="ts">
import Place from "~/lib/types/place";
import { vIntersectionObserver } from "@vueuse/components";

const props = defineProps<{
    places: Place[],
    listClass?: string,
}>();

const searchTimeout = ref();
const nameFilter = ref<string>("");
const filteredPlaces = computed(() => props.places?.filter(p => p.name.toLowerCase().includes(nameFilter.value.toLowerCase())));
const intersectedPlacesCount = ref(0);

const emit = defineEmits<{
    (event: "requestPlaces"): void
    (event: "placeFocused", placeId: string): void
}>();

const searchPlaces = (searchString: string) => nameFilter.value = searchString;

const handlePlaceClicked = (placeId: string) => emit("placeFocused", placeId);
const handleInputModified = (e: Event) => {
    if (!!searchTimeout.value) {
        clearTimeout(searchTimeout.value);
    }
    searchTimeout.value = setTimeout(searchPlaces, 50, (e.target as HTMLInputElement).value);
}
const handleObservedPlacesChanged = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            intersectedPlacesCount.value++;
        }
        if (intersectedPlacesCount.value >= filteredPlaces.value.length) {
            emit("requestPlaces");
        }
    });
};
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

input{
    padding: 1rem;
    width: 100%;
    font-family: inherit;
    border: 1px solid var(--color-grey-100);
    color: var(--color-foreground);
    background-color: var(--color-background);
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 1rem;
}
</style>