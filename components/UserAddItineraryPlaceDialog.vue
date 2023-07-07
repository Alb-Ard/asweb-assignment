<template>
    <dialog 
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
            <section>
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
const placesStore = usePlacesStore();

const props = defineProps<{
    open: boolean
}>();

const dialogRef = ref<HTMLDialogElement>();

const emit = defineEmits<{
    (event: "placeSelected", placeId: string): void,
    (event: "closed"): void
}>();

const handlePlaceSelected = (placeIndex: number) => emit("placeSelected", placesStore.places!.at(placeIndex)!.id);

watchEffect(() => {
    if (props.open) {
        dialogRef.value?.showModal();
    } else {
        dialogRef.value?.close();
    }
});

onMounted(() => placesStore.fetchAsync(0));
</script>

<style scoped>
dialog {
    margin: auto;
    display: grid;
    grid-template-rows: auto 1fr;
    width: 90vw;
    aspect-ratio: 1 / 1;
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
}
</style>