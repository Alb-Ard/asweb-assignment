<script setup lang="ts">
import { initializeIfEmptyAsync, whileLoadingAsync } from "~/lib/dataStore";

const toggleDeleteModal = ref(false);

const props = defineProps<{
    removeId: string
}>();

const authentication = useAuthentication();
const placeStore = usePlacesStore();
const isLoading = ref(false);

watch(authentication.userStore, newUserStore => { !!newUserStore.userData && whileLoadingAsync(isLoading, initializeIfEmptyAsync(() => placeStore.places, placeStore), null); }, { immediate: true });

function handleDeleteClick(placeId: string) {
    placeStore.deleteAsync(placeId);
}
</script>

<template>
    <div class="delte-button-container">
        <Button v-bind:full-width="true" color="danger" @click="toggleDeleteModal = !toggleDeleteModal">
            <span class="fa fa-trash"></span>
            Delete
        </Button>
        <dialog v-if="toggleDeleteModal" :open="toggleDeleteModal">
            <form action="#" method="post" v-on:submit.prevent="handleDeleteClick(props.removeId)" v-on:reset.prevent="toggleDeleteModal = false">
                <p>Do you really want to delete this place?</p>
                <div class="delete-modal-buttons-container">
                    <Button 
                        type="reset"
                    >
                        No, go back!
                    </Button>
                    <Button 
                        color="danger"
                        type="submit"
                    >
                        Yes, delete
                    </Button>
                </div>
            </form>
        </dialog>
    </div>
</template>

<style scoped>
dialog {
    bottom: 0;
    margin-bottom: 2.5rem;
    width: 100%;
    padding: 0.5rem;
    border: 2px solid var(--color-danger-700);
    background-color: var(--color-danger-900);
    border-radius: 1rem;
}

.delte-button-container {
    position: relative;
}

.delete-modal-buttons-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 0.5rem;
}
</style>