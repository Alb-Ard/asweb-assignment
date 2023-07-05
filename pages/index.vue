<template>
    <header class="main-header">
        <h1>Explorer</h1>
        <Button v-if="!!!userStore.userData" v-on:click="testLogin">Log in as Test</Button>
        <div v-else>
            <p>{{ userStore.userData.username }}</p>
            <Button v-on:click="testLogout" >Logout</Button>
        </div>
    </header>
    <main v-bind:class="!!focusedPlace ? 'place-focused' : ''">
        <div class="places-sidebar-section">
            <Transition mode="out-in">
                <UserPlacesSection
                    v-if="!!!focusedPlace"
                    v-bind:places="places" 
                    v-on:place-focused="setFocusedPlaceIndex" 
                />
                <UserFocusedPlaceSection
                    v-else
                    v-bind:place="focusedPlace"
                    v-on:back-pressed="setFocusedPlaceIndex(undefined)"
                />
            </Transition>
        </div>
        <section>
            <UserPlacesMap 
                v-bind:places="places" 
                v-bind:focused-index="focusedPlaceIndex"
                v-on:place-focused="setFocusedPlaceIndex"
            />
        </section>
    </main>
</template>

<script setup lang="ts">
import Place from "~/lib/types/place";
import User from "~/lib/types/user";
import axios from "axios";

const places = [
    {
        id: "0",
        name: "Place 0",
        owner: { id: "0", name: "Dave" },
        location: [47.41322, -1.219482] as [number, number],
        photoSrcs: [],
        reviews: [],
    },
    {
        id: "1",
        name: "Place 1",
        owner: { id: "0", name: "Luis" },
        location: [47.42022, -1.219482] as [number, number],
        photoSrcs: [],
        reviews: [],
    },
    {
        id: "2",
        name: "Place 2",
        owner: { id: "0", name: "Rob" },
        location: [47.41322, -1.210482] as [number, number],
        photoSrcs: [],
        reviews: [],
    }
] as Place[];

const focusedPlaceIndex = ref<number | undefined>(undefined);
const focusedPlace = computed(() => focusedPlaceIndex.value !== undefined ? places[focusedPlaceIndex.value] : undefined);
const userStore = useUserStore();

const setFocusedPlaceIndex = (index: number | undefined) => focusedPlaceIndex.value = index;

const testLogin = async () => {
    const response = await axios.post<User>("http://" + location.hostname + ":3001/api/user/login", {
        email: "foo@bar.com",
        password: "test"
    });
    if (response.status === 200) {
        userStore.changeUser(response.data);
    } else {
        userStore.changeUser(null);
        console.error(response.statusText);
    }
}

const testLogout = async () => {
    const response = await axios.get("http://" + location.hostname + ":3001/api/user/logout");
    userStore.changeUser(null);
};
</script>

<style scoped>
* {
    --show-place-info-duration: 150ms;
    --header-height: 9rem;
}

main {
    display: grid;
    grid-template-columns: 16rem 1fr;
    height: calc(100svh - var(--header-height));
    transition: grid-template-columns var(--show-place-info-duration) var(--show-place-info-duration) ease-in-out;
}

main.place-focused {
    grid-template-columns: 32rem 1fr;
}

.main-header {
    height: var(--header-height);
    padding: 2rem;
}

.places-sidebar-section {
    padding: 1rem;
    overflow-y: scroll;
}

.v-enter-active,
.v-leave-active {
  transition: translate var(--show-place-info-duration) ease-in-out;
}

.v-enter-from,
.v-leave-to {
  translate: -100% 0 0;
}
</style>