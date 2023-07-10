<template>
    <main>
        <h2>Your itineraries</h2>
        <p v-if="authentication.userStore.userData === undefined">Loading...</p>
        <p v-else-if="!!!authentication.userStore.userData">
            <NuxtLink to="/login">Log in</NuxtLink> or <NuxtLink to="/register">Sign up</NuxtLink> to create itineraries!
        </p>
        <p v-else-if="!!!itineraries">Loading...</p>
        <template v-else>
            <ol>
                <li 
                    v-for="itinerary in itineraries"
                    v-bind:key="itinerary._id"
                    v-intersection-observer="handleItineraryIntersectionChanged"
                >
                    <ButtonLink v-bind:to="`/itinerary/${itinerary._id}`">
                        {{ itinerary.name }}
                        <template v-slot:icon-right>
                            <span class="fa fa-arrow-right"></span>
                        </template>
                    </ButtonLink>
                </li>
            </ol>
            <Button
                v-bind:full-width="true"
                v-bind:disabled="isLoading"
                color="primary"
                v-on:click="handleAddItinerary"
            >
                +
            </Button>
        </template>
        <Fab
            v-bind:disabled="isLoading"
            color="primary"
            v-on:click="handleAddItinerary"
        >
            +
        </Fab>
    </main>
</template>

<script setup lang="ts">
import { initializeIfEmptyAsync, whileLoadingAsync } from "~/lib/dataStore";
import { vIntersectionObserver } from "@vueuse/components";

const itinerariesStore = useItinerariesStore();
const itineraries = computed(() => itinerariesStore.itineraries);
const authentication = useAuthentication();
const intersectedItinerariesCount = ref(0);
const isLoading = ref(false);

const handleAddItinerary = () => whileLoadingAsync(isLoading, itinerariesStore.createAsync("New Itinerary"), false);
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

watch(authentication.userStore, newUserStore => { !!newUserStore.userData && whileLoadingAsync(isLoading, initializeIfEmptyAsync(() => itinerariesStore.itineraries, itinerariesStore), null); }, { immediate: true });
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
    margin-bottom: 1rem;
}

li {
    list-style-type: none;
}

li:where(:not(:last-child)) {
    margin-bottom: 1rem;
}

@media screen and (width <= 1024px) {
    h2 {
        margin-inline: 0;
        text-align: center;
    }
}
</style>

