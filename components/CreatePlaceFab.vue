<script setup lang="ts">
import { initializeIfEmptyAsync, whileLoadingAsync } from "~/lib/dataStore";

const authentication = useAuthentication();
const placeStore = usePlacesStore();
const isLoading = ref(false);

watch(authentication.userStore, newUserStore => { !!newUserStore.userData && whileLoadingAsync(isLoading, initializeIfEmptyAsync(() => placeStore.places, placeStore), null); }, { immediate: true });
</script>

<template>
    <Fab color="primary" v-on:click="placeStore.createAsync('New place', [4.5, 2.1]).then(id => { id && navigateTo('/editpage/' + id); })">
        +
    </Fab>
</template>

<style scoped>

</style>