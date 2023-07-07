<template>
    <main>
        <p v-if="!!!authentication.userStore.userData">
            <RouterLink to="/login">Log in</RouterLink> or <RouterLink to="/register">Sign up</RouterLink> to create itineraries!
        </p>
        <p v-else-if="!!!itinerary">Loading...</p>
        <template v-else>
            <header>
                <ButtonLink to="/itineraries">
                    <template v-slot:icon-left>
                        {{ "<" }}
                    </template>
                    Back
                </ButtonLink>
                <h2 v-if="!isRenaming">{{ itinerary?.name }}</h2>
                <input v-else type="text" v-model="newName" placeholder="Input a name..." />
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
                            v-on:dragend="e => dragDrop.onDropEvent(place, e)"
                        >
                            <Panel>
                                = {{ place.name }} <Button color="danger">X</Button>
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
                <Button 
                    v-bind:full-width="true"
                    v-bind:color="isListExpanded ? 'grey' : 'primary'"
                    radius="0"
                    class="toggle-list-button"
                    v-on:click="isListExpanded = !isListExpanded"
                >
                    {{ isListExpanded ? "\\/" : "/\\" }}
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
    </main>
    <UserAddItineraryPlaceDialog 
        v-bind:open="isPlacePickerVisible"
        v-on:closed="isPlacePickerVisible = false"
        v-on:place-selected="handleAddPlace"
    />
</template>

<script setup lang="ts">
import { MapPlace } from "components/UserPlacesMap.vue";

const route = useRoute();
const authentication = useAuthentication();
const itinerariesStore = useItinerariesStore();
const itineraryId = ref(route.params.id as string);
const itinerary = computed(() => itinerariesStore.itineraries?.find(i => i.id === itineraryId.value));
const isListExpanded = ref(false);
const isPlacePickerVisible = ref(false);
const isRenaming = ref(false);
const isLoading = ref(false);
const newName = ref("");

const awaitWhileLoading = <T>(promise: Promise<T>) => {
    isLoading.value = true;
    return promise.then(() => isLoading.value = false);
}

const handleAddPlace = (placeId: string) => awaitWhileLoading(itinerariesStore.addPlaceAsync(itineraryId.value, placeId));
const handleDelete = () => awaitWhileLoading(itinerariesStore.deleteAsync(itineraryId.value).then(() => { navigateTo("/itineraries"); }));
const handlePlacesReorderedAsync = async (draggedPlace: MapPlace, targetPlace: MapPlace) => {
    if (!!!itinerary.value?.places) {
        return;
    }
    await awaitWhileLoading(itinerariesStore.swapPlacesAsync(itineraryId.value, draggedPlace.id, targetPlace.id));
}

const dragDrop = useDragDrop("itineraryPlace", handlePlacesReorderedAsync);

watch(authentication.userStore, newUserStore => { !!newUserStore.userData && itinerariesStore.fetchOneAsync(itineraryId.value); }, { immediate: true });
watchEffect(() => newName.value = itinerary.value?.name ?? "");
watch(isRenaming, (isNowRenaming, wasRenaming) => {
    if (wasRenaming && !isNowRenaming) {
        awaitWhileLoading(itinerariesStore.updateAsync({ id: itineraryId.value, name: newName.value }));
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