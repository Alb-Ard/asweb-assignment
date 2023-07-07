<template>
    <main>
        <h2>Your itineraries</h2>
        <p v-if="!!!itineraries">Loading...</p>
        <ol v-else-if="!!authentication.userStore.userData">
            <li 
                v-for="itinerary in itineraries"
                v-bind:key="itinerary.id"
                v-intersection-observer="handleItineraryIntersectionChanged"
            >
                <ButtonLink v-bind:to="`/itinerary/${itinerary.id}`">
                    {{ itinerary.name }}
                    <template v-slot:icon-right>
                        {{ ">" }}
                    </template>
                </ButtonLink>
            </li>
        </ol>
        <p v-else>
            <RouterLink to="/login">Log in</RouterLink> or <RouterLink to="/register">Sign up</RouterLink> to create itineraries!
        </p>
    </main>
</template>

<script setup lang="ts">
import { initializeIfEmpty } from "~/lib/dataStore";
import { vIntersectionObserver } from "@vueuse/components";

const itinerariesStore = useItinerariesStore();
const itineraries = computed(() => itinerariesStore.itineraries);
const authentication = useAuthentication();
const intersectedItinerariesCount = ref(0);

const handleItineraryIntersectionChanged = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
        if (!!!itineraries.value) {
            return;
        }
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            intersectedItinerariesCount.value++;
        }
        if (intersectedItinerariesCount.value >= itineraries.value.length) {
            itinerariesStore.fetchNextAsync();
        }
    });
};

watch(authentication.userStore, newUserStore => { !!newUserStore.userData && initializeIfEmpty(() => itinerariesStore.itineraries, itinerariesStore); }, { immediate: true });
</script>

<style scoped>
main {
    height: 100%;
    width: min(90%, 32rem);
    margin-inline: auto;
}

h2 {
    margin-left: 1rem;
    margin-bottom: 2rem;
}

ol {
    overflow: auto;
}

li {
    list-style-type: none;
}

li:where(:not(:last-child)) {
    margin-bottom: 1rem;
}
</style>

