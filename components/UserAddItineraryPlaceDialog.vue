<template>
    <dialog 
        v-if="open"
        v-bind:ref="e => dialogRef = (e as HTMLDialogElement)"
        v-on:close="emit('closed')"
    >
        <header>
            <p>Select places to add...</p>
            <Button color="danger" v-on:click="emit('closed')">X</Button>
        </header>
        <p v-if="!!!placesStore.places">Loading...</p>
        <div v-else>
            <UserPlacesSection
                v-bind:places="placesStore.places"
                v-on:place-focused="handlePlaceSelected"
            />
            <section class="places-map">
                <UserPlacesMap 
                    v-bind:places="placesStore.places" 
                    v-bind:focusable-places="true" 
                    v-bind:show-places-names="true" 
                    v-on:place-focused="handlePlaceSelected"
                />
            </section>
        </div>
    </dialog>
</template>

<script setup lang="ts">
import { initializeIfEmpty } from "~/lib/dataStore";

const placesStore = usePlacesStore();

const props = defineProps<{
    open: boolean
}>();

const dialogRef = ref<HTMLDialogElement>();

const emit = defineEmits<{
    (event: "placeSelected", placeId: string): void,
    (event: "closed"): void
}>();

const handlePlaceSelected = (placeId: string) => emit("placeSelected", placeId);

watchEffect(() => {
    if (props.open) {
        dialogRef.value?.showModal();
    } else {
        dialogRef.value?.close();
    }
});

onMounted(() => initializeIfEmpty(() => placesStore.places, placesStore));
</script>

<style scoped>
dialog {
    --header-height: 3rem;

    margin: auto;
    display: grid;
    grid-template-rows: var(--header-height) calc(90dvh - var(--header-height));
    width: 90vw;
    height: 90dvh;
    border: 0;
}

dialog > header {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 0.5rem;
}

dialog > div {
    display: grid;
    grid-template-columns: 16rem 1fr;
}

dialog::backdrop {
    backdrop-filter: blur(16px);
}

dialog > div > *:first-child {
    padding: 1rem;
    overflow: auto;
}

@media screen and (width <= 1024px) {
    dialog > div {
        grid-template-columns: 1fr;
    }

    .places-map {
        display: none;
    }
}
</style>