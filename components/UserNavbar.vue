<template>
    <nav>
        <ul>
            <li>
                <NuxtLink to="/" class="nav-link" v-bind:class="{ current: isPage('') }">Explore</NuxtLink>
            </li>
          <li>
            <NuxtLink to="/management" class="nav-link" v-bind:class="{ current: isPage('management') }">DashBoard</NuxtLink>
          </li>
            <li>
                <NuxtLink to="/itineraries" class="nav-link" v-bind:class="{ current: isPage('itineraries') }">Itineraries</NuxtLink>
            </li>
            <li v-if="showLogin">
                <ButtonLink v-if="!!!authentication.userStore.userData" to="/login">Log in</ButtonLink>
                <div v-else>
                    <p>{{ authentication.userStore.userData.username }}</p>
                    <Button v-on:click="logout">Logout</Button>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
const authentication = useAuthentication();
const route = useRoute();
const showLogin = computed(() => !isPage("login") && !isPage("register"));

const isPage = (pageName: string) => route.path === "/" + pageName;

const logout = async () => await authentication.logout();
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

li:nth-child(4) {
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

.nav-link:hover::before,
.nav-link.current::before {
    width: 100%;
}
</style>