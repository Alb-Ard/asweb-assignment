import axios, { AxiosResponse } from "axios";
import { getApiUrl } from "~/lib/api";
import User from "~/lib/types/user";

const useAuthentication = () => {
    const userStore = useUserStore();

    const registerAsync = async (username: string, email: string, password: string) => {
        try {
            const response = await axios.post(getApiUrl("user") + "/register", {
                username: username,
                email: email,
                password: password
            }, {
                withCredentials: true
            });
            if (response.status === 200) {
                await loginAsync(email, password);
            } else {
                userStore.changeUser(null);
            }
        } catch (error) {
            userStore.changeUser(null);
        }
    }

    const loginAsync = async (email: string, password: string) => {
        try {
            const response = await axios.post<User>(getApiUrl("user") + "/login", {
                email: email,
                password: password
            }, {
                withCredentials: true
            });
            if (response.status === 200) {
                userStore.changeUser(response.data);
            } else {
                userStore.changeUser(null);
            }
        } catch (error) {
            userStore.changeUser(null);
        }
    }

    const logoutAsync = async () => {
        try {
            await axios.post(getApiUrl("user") + "/logout", {}, {
                withCredentials: true
            });
        } catch (error) {
            
        }
        userStore.changeUser(null);
    };

    const renewAsync = async () => {
        try {
            const response = await axios.post<User>(getApiUrl("user") + "/renew", {}, {
                withCredentials: true
            });
            if (response.status === 200) {
                useUserStore().changeUser(response.data);
            } else {
                console.log(response.statusText);
            }
        } catch (error) {
            userStore.changeUser(null);
        }
    }

    const editAsync = async (username: string, email: string, password: string, currentPassword: string) => {
        try {
            if (!!!userStore.userData) {
                return false;
            }
            const data = {
                _id: userStore.userData._id,
                username: !!username && username !== "" ? username : undefined,
                email: !!email && email !== "" ? email : undefined,
                password: !!password && password !== "" ? password : undefined,
                currentPassword: currentPassword,
            }
            const response = await axios.patch(getApiUrl("user") + "/" + data._id, data, {
                withCredentials: true
            });
            if (response.status !== 200) {
                return false;
            }
            await renewAsync();
            return true;
        } catch (error) {
            return false;
        }
    }

    const deleteAsync = async () => {
        try {
            if (!!!userStore.userData) {
                return false;
            }
            const response = await axios.delete(getApiUrl("user") + "/" + userStore.userData._id, {
                withCredentials: true
            });
            if (response.status !== 200) {
                return false;
            }
            useUserStore().changeUser(null);
            return true;
        } catch (error) {
            return false;
        }
    }

    return {
        registerAsync,
        loginAsync,
        logoutAsync,
        renewAsync,
        editAsync,
        deleteAsync,
        userStore,
    };
};

export default useAuthentication;