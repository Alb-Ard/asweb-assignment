<template>
    <div class="global-container">
        <header>
            <h1>Ce.xplorer</h1>
            <UserNavbar />
        </header>
        <div class="page-container">
            <NuxtPage/>
        </div>
        <NotificationToastList 
            v-bind:notifications="notificationsStore.notifications"
            v-on:mark-as-read="notificationsStore.markAsReadAsync"
        />
    </div>
</template>

<script setup lang="ts">
const authentication = useAuthentication();
const notificationsStore = useNotificationsStore();
const notificationUnsubscribe = ref<() => void>();

watch(authentication.userStore, (newUser, previousUser) => {
    if (!!!newUser) {
        !!notificationUnsubscribe.value && notificationUnsubscribe.value();
        notificationUnsubscribe.value = undefined;
    } else if (!!!previousUser || !!!notificationUnsubscribe.value) {
        notificationsStore.fetchNextAsync();
        notificationUnsubscribe.value = notificationsStore.startAsyncReceiver();
    }
}, { immediate: true });
authentication.renewAsync();
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