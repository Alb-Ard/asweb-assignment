<script setup lang="ts">
const toggleDropDown = ref(false);
const notificationsStore = useNotificationsStore();
const notifications = computed(() => notificationsStore.notifications);
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);
</script>

<template>
    <div class="notify">
        <Button v-bind:flat="true" @click="toggleDropDown = !toggleDropDown">
            <span class="fa fa-bell"></span>
            <span class="unread-count">{{ unreadCount }}</span>
        </Button>
        <dialog v-if="toggleDropDown" :open="toggleDropDown">
            <Button v-bind:full-width="true" class="show-on-mobile" v-on:click="toggleDropDown = false">Close</Button>
            <ul v-if="notifications.length > 0">
                <li v-for="notification in notifications">
                    <ButtonLink 
                        v-if="!!notification.href && notification.href !== ''"
                        v-bind:to="notification.href" 
                    >
                        {{ notification.text }}
                    </ButtonLink>
                    <Panel v-else>{{ notification.text }}</Panel>
                </li>
            </ul>
            <p v-else>No notifications!</p>
        </dialog>
    </div>
</template>

<style scoped>
    dialog {
        position: absolute;
        border: 2px solid var(--color-grey-800);
        background-color: var(--color-background);
        width: 24rem;
        max-height: 256px;
        overflow-y: auto;
        border-radius: 1rem;
        padding: 0.5rem;
        margin-top: 0.5rem;
        translate: -70% 0 0;
    }

    dialog ul {
        margin-top: 0.5rem;
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 0.5rem;
    }

    .notify {
        position: relative;
        z-index: 10;
    }

    .fa-bell {
        font-size: 2rem;
    }

    .unread-count {
        background-color: var(--color-primary-600);
        color: var(--color-on-600);
        border-radius: 100vw;
        aspect-ratio: 1 / 1;
        width: 1.5rem;
        font-size: 1rem;
        position: absolute;
        top: 0;
        right: 0;
        padding-block: auto;
    } 
    .show-on-mobile {
        display: none;
    }   

    @media screen and (width <= 1024px) {
        .show-on-mobile {
            display: unset;
        }   

        dialog {
            position: fixed;
            translate: 0;
            inset: 0;
        }
    }
</style>