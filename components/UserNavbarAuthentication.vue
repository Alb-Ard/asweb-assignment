<template>
    <ButtonLink v-if="!!!authentication.userStore.userData" to="/login">Log in</ButtonLink>
    <div v-else>
        <Button v-bind:full-width="true" v-on:click="showDropdown = !showDropdown">Profile</Button>
        <dialog v-if="showDropdown" v-bind:open="showDropdown">
            <p>{{ authentication.userStore.userData.username }}</p>
            <ButtonLink v-bind:flat="true" to="/management" v-on:click="showDropdown = false">Manager</ButtonLink>
            <ButtonLink v-bind:flat="true" to="/user-settings" v-on:click="showDropdown = false">Settings</ButtonLink>
            <Button v-bind:flat="true" v-on:click="logout">Logout</Button>
        </dialog>
    </div>
</template>

<script setup lang="ts">
const authentication = useAuthentication();
const showDropdown = ref(false);

const logout = async () => await authentication.logoutAsync();
</script>

<style scoped>
* {
    margin-block: auto;
}

div {
    z-index: 10;
    position: relative;
    width: 5rem;
}

dialog {
    border: 2px solid var(--color-grey-800);
    background-color: var(--color-background);
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
}
</style>