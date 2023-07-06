<template>
    <main>
        <p v-if="!!!itinerary">Loading...</p>
        <template v-else-if="!!authentication.userStore.userData">
            <header>
                <ButtonLink to="/itineraries">
                    <template v-slot:icon-left>
                        {{ "<" }}
                    </template>
                    Back
                </ButtonLink>
                <h2>{{ itinerary?.name }}</h2>
            </header>
            <div 
                v-bind:class="{ 'itinerary-container': true, 'itinerary-list-visible': listExpanded, 'itinerary-map-visible': !listExpanded }"
            >
                <section class="itinerary-list">
                    <ol>
                        <li
                            v-for="place in itinerary.places"
                            v-bind:draggable="true"
                            v-on:dragstart="e => dragDrop.onStartDragging(place, e)"
                            v-on:dragover="e => dragDrop.canDropOntoItem(e)"
                            v-on:dragend="e => dragDrop.onDropEvent(place, e)"
                        >
                            <Panel>
                                = {{ place.name }}
                            </Panel>
                        </li>
                    </ol>
                </section>
                <Button 
                    v-bind:full-width="true"
                    v-bind:color="listExpanded ? 'grey' : 'primary'"
                    radius="0"
                    class="toggle-list-button"
                    v-on:click="listExpanded = !listExpanded"
                >
                    {{ listExpanded ? "\\/" : "/\\" }}
                </Button>
                <section class="itinerary-map">
                    <UserPlacesMap 
                        v-bind:places="itinerary.places" 
                        v-bind:focusable-places="false"
                        v-bind:show-places-names="true"
                    />
                </section>
            </div>
        </template>
        <p v-else>
            <RouterLink to="/login">Log in</RouterLink> or <RouterLink to="/register">Sign up</RouterLink> to create itineraries!
        </p>
    </main>
</template>

<script setup lang="ts">
import { MapPlace } from 'components/UserPlacesMap.vue';

const route = useRoute();
const authentication = useAuthentication();
const itinerariesStore = useItinerariesStore();
const itineraries = computed(() => itinerariesStore.itineraries);
const itineraryId = ref(route.params.id as string);
const itinerary = computed(() => itineraries.value?.find(i => i.id === itineraryId.value));
const listExpanded = ref(false);

const handlePlacesReordered = (draggedPlace: MapPlace, targetPlace: MapPlace) => {
    if (!!!itinerary.value?.places) {
        return;
    }
    //itinerary.value.places = itinerary.value.places.filter(p => p.id !== draggedPlace.id);
    //itinerary.value.places.splice(itinerary.value.places.indexOf(targetPlace), 0, draggedPlace);
}

const dragDrop = useDragDrop("itineraryPlace", handlePlacesReordered);

onMounted(() => itinerariesStore.fetchAsync(0));
</script>

<style scoped>
main {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
}

main > header {
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 1rem;
    text-align: center;
}

section:first-child {
    padding: 1rem;
    overflow: auto;
}

li {
    list-style-type: none;
}

li:where(:not(:last-child)) {
    margin-bottom: 1rem;
}

.itinerary-container {
    display: grid;
    grid-template-columns: 16rem 1fr;
}

.toggle-list-button {
    display: none;
}

@media screen and (width <= 1024px) {
    .toggle-list-button {
        display: unset;
    }

    .itinerary-container {
        grid-template-columns: unset;
        transition: grid-template-rows 150ms ease-in-out;
    }

    .itinerary-list-visible {
        grid-template-rows: 0 3rem 1fr;
    }

    .itinerary-map-visible {
        grid-template-rows: 1fr 3rem 0;
    }

    .itinerary-list {
        grid-row: 3 / 4;
    }

    .itinerary-map {
        grid-row: 1 / 2;
    }
}
</style>