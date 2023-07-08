<template>
    <div class="global-container">
        <header>
            <h1>Explorer</h1>
            <UserNavbar />
        </header>
        <div class="page-container">
            <NuxtPage/>
        </div>
    </div>
</template>

<script setup lang="ts">
import useAuthentication from "~/composables/useAuthentication";
import DashBoard from "~/pages/DashBoard.vue";

/*const pageRef = ref();

pageRef.value*/

const authentication = useAuthentication();

onMounted(() => authentication.renewAsync());
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