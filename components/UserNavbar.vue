<template>
    <nav>
        <ul>
            <li>
                <RouterLink to="/" class="nav-link">Explore</RouterLink>
            </li>
            <li>
                <RouterLink to="/itineraries" class="nav-link">Itineraries</RouterLink>
            </li>
            <li>
                <Button v-if="!!!userStore.userData" v-on:click="testLogin">Log in as Test</Button>
                <div v-else>
                    <p>{{ userStore.userData.username }}</p>
                    <Button v-on:click="testLogout">Logout</Button>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import axios from "axios";
import User from "~/lib/types/user";

const userStore = useUserStore();

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
ul {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

li {
    list-style-type: none;
    display: inline-block;
    column-gap: 1rem;
}

li:last-child {
    margin-left: auto;
}

.nav-link {
    position: relative;
    padding: 0.5rem;
    color: var(--color-forground);
    text-decoration: none;
}

.nav-link:visited {
    color: var(--color-forground);
}

.nav-link:hover {
    text-decoration: none;
}

.nav-link::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    border-bottom: 2px solid currentColor;
    transition: width 100ms ease-in-out;
}

.nav-link:hover::before {
    width: 100%;
}
</style>