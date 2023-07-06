<template>
    <main>
        <h2>Your itineraries</h2>
        <ol v-if="!!userStore.userData">
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

const userStore = useUserStore();
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

