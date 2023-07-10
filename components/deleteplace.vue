<script setup lang="ts">

import {initializeIfEmptyAsync, whileLoadingAsync} from "~/lib/dataStore";

let toggle = ref<boolean>(false);


const props = defineProps<{
    removeId: string
}>();

const authentication = useAuthentication();
const placeStore = usePlacesStore();
const isLoading = ref(false);

watch(authentication.userStore, newUserStore => { !!newUserStore.userData && whileLoadingAsync(isLoading, initializeIfEmptyAsync(() => placeStore.places, placeStore), null); }, { immediate: true });

function deleteByName(id: string) {
    placeStore.deleteAsync(id)
}

</script>

<template>
    <button @click="toggle = !toggle">Rimuovi</button>
    <dialog class="modal" v-if="toggle" :open="toggle">
        <form>
            <p>Confermi la rimozione?</p>
            <button @click="deleteByName(props.removeId)" class ="submit-button" type="button">Rimuovi</button>
        </form>
    </dialog>
</template>

<style scoped>

.modal {
    margin-right: 10%;
    margin-left: 10%;
    width: 80%;
}

.submit-button {
    width: 10%;
    height: 20px;
    margin-top: 10px;
}


</style>