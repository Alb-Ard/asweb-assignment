<template>
    <main>
        <h2>Your itineraries</h2>
        <p v-if="!!!itineraries">Loading...</p>
        <ol v-else-if="!!authentication.userStore.userData">
            <li 
                v-for="itinerary in itineraries"
                v-bind:key="itinerary.id"
            >
                <ButtonLink v-bind:to="`/itinerary/${itinerary.id}`">
                    {{ itinerary.name }}
                    <template v-slot:icon-right>
                        {{ ">" }}
                    </template>
                </ButtonLink>
            </li>
        </ol>
        <p v-else>
            <RouterLink to="/login">Log in</RouterLink> or <RouterLink to="/register">Sign up</RouterLink> to create itineraries!
        </p>
    </main>
</template>

<script setup lang="ts">
const itinerariesStore = useItinerariesStore();
const itineraries = computed(() => itinerariesStore.itineraries);
const authentication = useAuthentication();

watch(authentication.userStore, newUserStore => { !!newUserStore.userData && itinerariesStore.fetchAsync(0); }, { immediate: true });
</script>

<style scoped>
main {
    height: 100%;
    width: min(90%, 32rem);
    margin-inline: auto;
}

h2 {
    margin-left: 1rem;
    margin-bottom: 2rem;
}

li {
    list-style-type: none;
}

li:where(:not(:last-child)) {
    margin-bottom: 1rem;
}
</style>

