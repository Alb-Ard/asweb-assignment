<template>
    <main>
        <p v-if="!!!authentication.userStore.userData">
            <NuxtLink to="/login">Log in</NuxtLink> or <NuxtLink to="/register">Sign up</NuxtLink> to create itineraries!
        </p>
        <p v-else-if="!!!itinerary">Loading...</p>
        <template v-else>
            <header>
                <ButtonLink to="/itineraries" class="hidden-on-mobile">
                    <template v-slot:icon-left>
                        <span class="fa fa-arrow-left"></span>
                    </template>
                    Back
                </ButtonLink>
                <h2 v-if="!isRenaming">{{ newName }}</h2>
                <div v-else>
                    <InputLabel text="New name" for="newName" />
                    <InputField class="new-name-field" type="text" v-model="newName" id="newName" placeholder="Input a name..." />
                </div>
                <Button 
                    v-bind:disabled="isLoading"
                    v-on:click="isRenaming = !isRenaming"
                >
                    {{ isRenaming ? "Confirm" : "Rename" }}
                </Button>
                <Button 
                    v-bind:disabled="isLoading"
                    color="danger"
                    v-on:click="handleDelete"
                >
                    Delete
                </Button>
            </header>
            <div 
                v-bind:class="{ 'itinerary-container': true, 'itinerary-list-visible': isListExpanded, 'itinerary-map-visible': !isListExpanded }"
            >
                <section class="itinerary-list">
                    <ol>
                        <li
                            v-for="place in itinerary.places"
                            v-bind:draggable="true"
                            v-on:dragstart="e => dragDrop.onStartDragging(place, e)"
                            v-on:dragover="e => dragDrop.canDropOntoItem(e)"
                            v-on:drop="e => dragDrop.onDropEvent(place, e)"
                        >
                            <Panel class="itinerary-list-element">
                                <span>=</span>
                                <p>{{ place.name }}</p>
                                <Button color="danger" v-on:click="handleRemovePlace(place._id)">
                                    <span class="fa fa-trash"></span>
                                </Button>
                            </Panel>
                        </li>
                    </ol>
                    <Button 
                        v-bind:full-width="true" 
                        v-bind:disabled="isLoading"
                        color="primary"
                        v-on:click="isPlacePickerVisible = true"
                    >
                        +
                    </Button>
                </section>
                <section class="itinerary-map">
                    <UserPlacesMap 
                        v-bind:places="itinerary.places" 
                        v-bind:focusable-places="false"
                        v-bind:show-places-names="true"
                    />
                </section>
                <Button 
                    v-bind:full-width="true"
                    v-bind:color="isListExpanded ? 'grey' : 'primary'"
                    radius="0"
                    class="toggle-list-button"
                    v-on:click="isListExpanded = !isListExpanded"
                >
                    <span v-bind:class="{ 'fa': true, 'fa-list': !isListExpanded, 'fa-map': isListExpanded }"></span>
                </Button>
            </div>
            <UserAddItineraryPlaceDialog 
                v-bind:open="isPlacePickerVisible"
                v-on:closed="isPlacePickerVisible = false"
                v-on:place-selected="handleAddPlace"
            />
            <Fab
                v-bind:disabled="isLoading"
                color="primary"
                class="hidden-on-mobile"
                v-on:click="isPlacePickerVisible = true"
            >
                +
            </Fab>
        </template>
    </main>
</template>

<script setup lang="ts">
import { MapPlace } from "components/UserPlacesMap.vue";
import { whileLoadingAsync } from "~/lib/dataStore";

const route = useRoute();
const authentication = useAuthentication();
const itinerariesStore = useItinerariesStore();
const itineraryId = ref(route.params.id as string);
const itinerary = computed(() => itinerariesStore.itineraries?.find(i => i._id === itineraryId.value));
const isListExpanded = ref(false);
const isPlacePickerVisible = ref(false);
const isRenaming = ref(false);
const isLoading = ref(false);
const newName = ref("");

const handleAddPlace = (placeId: string) => whileLoadingAsync(isLoading, itinerariesStore.addPlaceAsync(itineraryId.value, placeId), false);
const handleRemovePlace = (placeId: string) => whileLoadingAsync(isLoading, itinerariesStore.removePlaceAsync(itineraryId.value, placeId), false);
const handleDelete = () => whileLoadingAsync(isLoading, itinerariesStore.deleteAsync(itineraryId.value).then(success => { success && navigateTo("/itineraries"); }), null);
const handlePlacesReorderedAsync = async (draggedPlace: MapPlace, targetPlace: MapPlace) => {
    if (!!!itinerary.value?.places) {
        return;
    }
    await whileLoadingAsync(isLoading, itinerariesStore.swapPlacesAsync(itineraryId.value, draggedPlace._id, targetPlace._id), false);
}

const dragDrop = useDragDrop("itineraryPlace", handlePlacesReorderedAsync);

watch(authentication.userStore, newUserStore => { !!newUserStore.userData && whileLoadingAsync(isLoading, itinerariesStore.fetchOneAsync(itineraryId.value), null); }, { immediate: true });
watchEffect(() => newName.value = itinerary.value?.name ?? "");
watch(isRenaming, (isNowRenaming, wasRenaming) => {
    if (!!!itinerary.value) {
        return;
    }
    if (wasRenaming && !isNowRenaming && newName.value !== itinerary.value.name) {
        whileLoadingAsync(isLoading, itinerariesStore.updateAsync({ _id: itineraryId.value, name: newName.value }), false);
    }
});
</script>

<style scoped>
main {
    --header-height: 4rem;

    height: 100%;
    display: grid;
    grid-template-rows: var(--header-height) calc(100% - var(--header-height));
}

main > header {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    column-gap: 1rem;
    padding: 1rem;
    text-align: center;
}

main > header > div {
    display: flex;
}

section:first-child {
    padding: 1rem;
    overflow: auto;
}

ol {
    margin-bottom: 1rem;
    overflow: auto;
}

li {
    list-style-type: none;
}

li:where(:not(:last-child)) {
    margin-bottom: 1rem;
}

.new-name-field {
    padding: 0.25rem;
}

.itinerary-container {
    display: grid;
    grid-template-columns: 16rem 1fr;
}

.itinerary-list-element {
    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
}

.itinerary-list-element > * {
    margin-block: auto;
}

.toggle-list-button {
    display: none;
}

@media screen and (width <= 1024px) {
    main {
        --header-height: 5.5rem;
    }

    main > header {
        grid-template-columns: 1fr 1fr;
        font-size: 0.75rem;
    }

    main > header > h2,
    main > header > div {
        grid-column: 1 / -1;
        margin-bottom: 0.5rem;
    }
    
    main > header > div {
        display: grid;
        grid-template-columns: auto 1fr;
    }

    main > header > div > * {
        margin-block: auto;
    }

    .hidden-on-mobile {
        display: none;
    }

    .toggle-list-button {
        display: unset;
    }

    .itinerary-container {
        grid-template-columns: unset;
        transition: grid-template-rows 150ms ease-in-out;
    }

    .itinerary-list-visible {
        grid-template-rows: 0 1fr 3rem;
    }

    .itinerary-map-visible {
        grid-template-rows: 1fr 0 3rem;
    }

    .itinerary-list {
        grid-row: 2 / 3;
    }

    .itinerary-map {
        grid-row: 1 / 2;
    }
}
</style>