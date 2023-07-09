<template>
    <aside>
        <ul>
            <li v-for="notification in unreadNotifications">
                <Panel 
                    v-if="!hiddenNotificationIds.includes(notification._id)"
                    class="notification-toast"
                >
                    <div class="notification-toast-content">
                        <p>{{ notification.text }}</p>
                        <Button v-bind:flat="true" v-bind:full-width="true" color="primary" v-on:click="markNotificationAsRead(notification._id)">Close</Button>
                        <div class="notification-toast-progress" v-bind:style="`--duration: ${notificationShowDurationMillis}ms`"></div>
                    </div>
                </Panel>
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">
import UserNotification from 'lib/types/userNotification';

const notificationShowDurationMillis = 10000;

const props = defineProps<{
    notifications: UserNotification[]
}>();
const unreadNotifications = computed(() => props.notifications.filter(n => !n.read));
const hiddenNotificationIds = ref<string[]>([]);
const notificationTimeouts = ref(new Map<string, NodeJS.Timeout>());

const emit = defineEmits<{
    (event: "markAsRead", id: string): void
}>();

const markNotificationAsRead = (id: string) => {
    emit("markAsRead", id);
    if (hiddenNotificationIds.value.includes(id)) {
        return;
    }
    hiddenNotificationIds.value.push(id);
    clearTimeout(notificationTimeouts.value.get(id));
}

watch(unreadNotifications, () => {
    unreadNotifications.value.forEach(notification => {
        if (!hiddenNotificationIds.value.includes(notification._id)) {
            notificationTimeouts.value.set(notification._id, setTimeout(markNotificationAsRead, notificationShowDurationMillis, notification._id));
        }
    })
}, { immediate: true });
</script>

<style scoped>
aside {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 20rem;
}

ul {
    display: flex;
    flex-direction: column-reverse;
    margin: 1rem;
}

li {
    list-style-type: none;
}

.notification-toast {
    padding: 0.5rem;
    border: 2px solid var(--color-grey-800);
    background-color: var(--color-background);
    color: var(--color-foreground);
    transition: opacity 500ms, display 500ms;
}

li:where(:not(:last-child)) > .notification-toast {
    margin-top: 1rem;
}

.notification-hidden {
    opacity: 0;
    display: none;
}

.notification-toast-content {
    display: grid;
    grid-template-rows: 1fr 1fr;
    font-size: 0.85rem;
    position: relative;
}

.notification-toast-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--color-primary-400);
    height: 0.25rem;
    margin: 0.15rem;
    border-radius: 2rem;
    animation: progress-elapse var(--duration, 10000ms) linear forwards;
    transform-origin: 0 50%;
}

@keyframes progress-elapse {
    from {
        scale: 1 1 1;
    }
    to {
        scale: 0 1 1;
    }
}

@media screen and(width <= 1024px) {
    /* Hide toasts on mobile */
    aside {
        display: none;
    }
}
</style>