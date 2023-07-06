<template>
    <div class="global-container">
        <header>
            <h1>Explorer</h1>
            <UserNavbar />
        </header>
        <div class="page-container">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import User from "~/lib/types/user";

onMounted(() => {
    const renewSession = async () => {
        const response = await axios.get<User>("http://" + location.hostname + ":3001/api/user/renew");
        if (response.status === 200) {
            useUserStore().changeUser(response.data);
        } else {
            console.log(response.statusText);
        }
    }

    renewSession();
})
</script>

<style scoped>
.global-container {
    --header-height: 10rem;

    height: 100dvh;
    display: grid;
    grid-template-rows: var(--header-height) calc(100dvh - var(--header-height));
}

header {
    padding: 2rem;
}

h1 {
    margin-bottom: 1rem;
}
</style>