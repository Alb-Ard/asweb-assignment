<template>
    <section>
        <header>
            <h2>Places</h2>
        </header>
        <input type="text" id="searchPlaceName" placeholder="Search..." v-on:input="handleInputModified" />
        <ol>
            <li 
                v-for="(place, placeIndex) in filteredPlaces"
                v-bind:key="place.id"
                v-intersection-observer="handleObservedPlacesChanged"
            >
                <Button 
                    v-bind:full-width="true" 
                    v-on:click="handlePlaceClicked(place.id)"
                    >
                    {{ place.name }}
                    <img v-if="place.photoSrcs.length > 0" v-bind:src="place.photoSrcs.at(0)" />
                </Button>
                <Button color="danger" v-on:click="emit('testRemove', place.id)">X</Button>
            </li>
        </ol>
    </section>
</template>

<script setup lang="ts">
import Place from "~/lib/types/place";
import { vIntersectionObserver } from "@vueuse/components";

const props = defineProps<{
    places: Place[],
}>();

const searchTimeout = ref();
const nameFilter = ref<string>("");
const filteredPlaces = computed(() => props.places?.filter(p => p.name.includes(nameFilter.value)));
const intersectedPlacesCount = ref(0);

const emit = defineEmits<{
    (event: "requestPlaces"): void
    (event: "placeFocused", placeId: string): void,
    (event: "testRemove", placeId: string): void
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
</style>