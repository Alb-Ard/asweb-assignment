import axios from "axios";
import { getApiUrl } from "~/lib/api";
import User from "~/lib/types/user";

const useAuthentication = () => {
    const userStore = useUserStore();

    const registerAsync = async (username: string, email: string, password: string) => {
        const response = await axios.post(getApiUrl("user") + "/register", {
            usernamme: username,
            email: email,
            password: password
        }, {
            withCredentials: true
        });
        if (response.status === 200) {
            await loginAsync(email, password);
        } else {
            userStore.changeUser(null);
            console.error(response.statusText);
        }
    }

    const loginAsync = async (email: string, password: string) => {
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
            console.error(response.statusText);
        }
    }

    const logoutAsync = async () => {
        await axios.post(getApiUrl("user") + "/logout");
        userStore.changeUser(null);
    };

    const renewAsync = async () => {
        const response = await axios.post<User>(getApiUrl("user") + "/renew", {}, {
            withCredentials: true
        });
        if (response.status === 200) {
            useUserStore().changeUser(response.data);
        } else {
            console.log(response.statusText);
        }
    }

    return {
        registerAsync,
        loginAsync,
        logoutAsync,
        renewAsync,
        userStore,
    };
};

export default useAuthentication;