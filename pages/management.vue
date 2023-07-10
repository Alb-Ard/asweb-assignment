<script setup lang="ts">
import { initializeIfEmptyAsync, whileLoadingAsync } from "~/lib/dataStore";

const authentication = useAuthentication();
const placeStore = usePlacesStore();
const places = computed(() => placeStore.places?.filter(p => p.owner._id === authentication.userStore.userData?._id));
const isLoading = ref(false);

watch(authentication.userStore, newUserStore => {
    !!newUserStore.userData && whileLoadingAsync(isLoading, initializeIfEmptyAsync(() => placeStore.places, placeStore), null);
}, { immediate: true });
</script>

<template>
    <p v-if="authentication.userStore.userData === undefined">Loading...</p>
    <p v-else-if="!!!authentication.userStore.userData">Please log in to enter manager mode!</p>
    <p v-else-if="!!!places">Loading...</p>
    <template v-else>
        <header>
            <h2>Welcome back, {{ authentication.userStore.userData?.username }}</h2>
        </header>
        <UserPlacesSection 
            v-bind:places="places"
            v-bind:is-editable="true"
            class="place-list-section"
            list-class="place-list"
            v-on:request-places="placeStore.fetchNextAsync()" 
            v-on:place-focused="id => navigateTo('/dashboard/' + id)"
        >
            <template v-slot="slotProps">
                <ButtonLink v-bind:full-width="true" class="place-action-button" v-bind:to="'/editpage/' + slotProps.placeId">
                    <span class="fa fa-pencil"></span>
                    Edit
                </ButtonLink>
                <DeletePlaceButton class="place-action-button" :remove-id="slotProps.placeId" />
            </template>
        </UserPlacesSection>
        <CreatePlaceFab />
    </template>
</template>
<style scoped>
h2 {
  text-align: center;
  color: var(--color-on-400);
  font-size: 1.5rem;
}

h3 {
  text-align: center;
  margin-bottom: 2rem;
}

header {
  background-color: var(--color-primary-400);
  padding: 1rem;
  margin-bottom: 2rem;
}

li {
    list-style-type: none;
}

p {
    text-align: center;
}

.place-list-section {
  width: min(90vw, 72rem);
  margin-inline: auto;
}

:deep(.place-list) {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.place-action-button {
    margin-top: 0.5rem;
}

@media screen and (width <= 1024px) {
    :deep(.place-list) {
        grid-template-columns: 1fr 1fr;
    }
}

@media screen and (width <= 512px) {
    :deep(.place-list) {
        grid-template-columns: 1fr;
    }
}

</style>