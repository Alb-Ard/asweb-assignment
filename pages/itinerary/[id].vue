<template>
    <main>
        <template v-if="!!userStore.userData">
            <header>
                <ButtonLink to="/itineraries">
                    <template v-slot:icon-left>
                        {{ "<" }}
                    </template>
                    Back
                </ButtonLink>
                <h2>{{ itinerary?.name }}</h2>
            </header>
            <div v-bind:class="`itinerary-container ${listExpanded ? 'itinerary-list-visible' : 'itinerary-map-visible'}`">
                <section class="itinerary-list">
                    <ol>
                        <li
                            v-for="place in itineraryPlaces"
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
                        v-bind:places="itineraryPlaces" 
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

const itineraries = [
    {
        id: "0",
        name: "Trip 1"
    },
    {
        id: "1",
        name: "Trip 2"
    },
    {
        id: "2",
        name: "Trip 3"
    }
];

const itineraryPlaces = ref<MapPlace[]>([
    {
        id: "0",
        name: "Place 0",
        location: [47.42022, -1.219482] as [number, number]
    },
    {
        id: "1",
        name: "Place 1",
        location: [47.52022, -1.319482] as [number, number]
    },
    {
        id: "2",
        name: "Place 2",
        location: [47.48022, -1.299482] as [number, number]
    },
    {
        id: "3",
        name: "Place 3",
        location: [48.12022, -1.219482] as [number, number]
    },
    {
        id: "4",
        name: "Place 4",
        location: [47.42922, -1.279482] as [number, number]
    }
]);

const route = useRoute();
const userStore = useUserStore();
const itineraryId = ref(route.params.id as string);
const itinerary = computed(() => itineraries.find(i => i.id === itineraryId.value));
const listExpanded = ref(false);

const handlePlacesReordered = (draggedPlace: MapPlace, targetPlace: MapPlace) => {
    itineraryPlaces.value = itineraryPlaces.value.filter(p => p.id !== draggedPlace.id);
    itineraryPlaces.value.splice(itineraryPlaces.value.indexOf(targetPlace), 0, draggedPlace);
}

const dragDrop = useDragDrop("itineraryPlace", handlePlacesReordered);
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
        grid-template-columns: 1fr;
    }

    .itinerary-list-visible {
        grid-auto-rows: 0 2rem 1fr;
    }

    .itinerary-map-visible {
        grid-auto-rows: 1fr 2rem 0;
    }

    .itinerary-list {
        grid-row: 3 / 4;
    }

    .itinerary-map {
        grid-row: 1 / 2;
    }
}
</style>