import { defineStore } from "pinia";
import User from "~/lib/types/user";

export const useUserStore = defineStore("user", () => {
    const userData = ref<User | null | undefined>(undefined);

    const changeUser = (newUser: User | null) => userData.value = newUser;

    return {
        userData: computed(() => userData.value),
        changeUser,
    };
});