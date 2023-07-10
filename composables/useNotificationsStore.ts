import axios from "axios";
import { getApiUrl } from "~/lib/api";
import UserNotification from "~/lib/types/userNotification";
import { defineStore } from "pinia";
import { io } from "socket.io-client";

export const useNotificationsStore = defineStore("notifications", () => {
    const notifications = ref<UserNotification[]>([]);
    const authentication = useAuthentication();

    const startAsyncReceiver = () => {
        try {
            const socket = io("http://localhost:3001", {
                withCredentials: true,
            });
            console.log("NOTIFY creating websocket");
            socket.on("notification", handleSocketMessage);
            socket.connect();
            const disconnect = () => {
                socket.disconnect();
                socket.off("notification", handleSocketMessage);
            }
            return disconnect;
        } catch (error) {
            return () => { };
        }
    }

    const fetchNextAsync = async () => {
        try {
            if (!!!authentication.userStore.userData) {
                return;
            }
            const response = await axios.get<UserNotification[]>(getApiUrl("user") + "/" + authentication.userStore.userData._id + "/notification", {
                withCredentials: true
            });
            if (response.status !== 200) {
                return;
            }
            response.data.forEach(addNotification);
        } catch (error) {
            
        }
    }

    const markAsReadAsync = async (id: string) => {
        try {
            if (!!!authentication.userStore.userData) {
                return false;
            }
            const response = await axios.patch(getApiUrl("user") + "/" + authentication.userStore.userData._id + "/notification/" + id, {
                read: true
            }, {
                withCredentials: true
            });
            if (response.status !== 200) {
                return false;
            }
            const notification = notifications.value.find(n => n._id === id);
            if (!!!notification) {
                await fetchNextAsync();
                return;
            }
            addNotification({
                ...notification,
                read: true
            });
        } catch (error) {
            return false;
        }
        return true;
    }

    const deleteAsync = async (id: string) => {
        try {
            if (!!!authentication.userStore.userData) {
                return false;
            }
            const response = await axios.delete(getApiUrl("user") + "/" + authentication.userStore.userData._id + "/notification/" + id, {
                withCredentials: true
            });
            if (response.status !== 200) {
                return false;
            }
            notifications.value = notifications.value.filter(n => n._id !== id);
        } catch (error) {
            return false;
        }
        return true;
    }

    const handleSocketMessage = (notification: UserNotification) => {
        addNotification(notification);
    }

    const addNotification = (newNotification: UserNotification) => {
        if (!!!notifications.value) {
            notifications.value = [];
        }
        const existingNotification = notifications.value.find(i => i._id === newNotification._id);
        if (!!existingNotification) {
            Object.assign(existingNotification, newNotification);
        } else {
            notifications.value.push(newNotification);
        }
    }

    return {
        notifications: computed(() => notifications.value),
        startAsyncReceiver,
        fetchNextAsync,
        markAsReadAsync,
        deleteAsync,
    };
});