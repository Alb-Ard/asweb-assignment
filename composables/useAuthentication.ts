import axios from "axios";
import User from "~/lib/types/user";

const useAuthentication = () => {
    const getApiUrl = () => "http://" + location.hostname + ":3001/api/user";
    const userStore = useUserStore();

    const loginAsync = async (email: string, password: string) => {
        const response = await axios.post<User>(getApiUrl() + "/login", {
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
        await axios.get(getApiUrl() + "/logout");
        userStore.changeUser(null);
    };

    const renewAsync = async () => {
        const response = await axios.get<User>(getApiUrl() + "/renew", {
            withCredentials: true
        });
        if (response.status === 200) {
            useUserStore().changeUser(response.data);
        } else {
            console.log(response.statusText);
        }
    }

    return {
        login: loginAsync,
        logout: logoutAsync,
        renew: renewAsync,
        userStore,
    };
};

export default useAuthentication;