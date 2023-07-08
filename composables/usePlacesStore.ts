import axios from "axios";
import { areFetchedPagesComplete } from "~/lib/dataStore";
import { defineStore } from "pinia";
import { getApiUrl } from "~/lib/api";
import Place from "~/lib/types/place";

export const usePlacesStore = defineStore("places", () => { 
    const places = ref<Place[] | undefined>(undefined);
    const page = ref(0);
    const authentication = useAuthentication();

    const fetchNextAsync = async () => {
        const response = await axios.get<Place[]>(getApiUrl("place") + "?page=" + page.value);
        if (response.status !== 200) {
            return;
        }
        if (areFetchedPagesComplete(response.data)) {
            page.value++;
        }
        response.data.forEach(addPlace);
    };

    const fetchOneAsync = async (id: string) => {
        const response = await axios.get<Place>(getApiUrl("place") + "/" + id);
        if (response.status !== 200) {
            return;
        }
        addPlace(response.data);
    };

    const createAsync = async (name: string, location: [number, number]) => {
        if (!!!authentication.userStore.userData) {
            return false;
        }
        const response = await axios.post<string>(getApiUrl("place"), {
            name: name,
            owner: authentication.userStore.userData._id,
            location: location,
        }, {
            withCredentials: true
        });
        if (response.status !== 200) {
            return false;
        }
        await fetchOneAsync(response.data);
        return true;
    }

    const updateAsync = async (place: Partial<Place> & { _id: string }) => {
        const { _id: placeId, ...placeData } = place;
        const response = await axios.patch(getApiUrl("place") + "/" + placeId, placeData, {
            withCredentials: true
        });
        if (response.status !== 200) {
            return false;
        } else if (places.value?.some(p => p._id === placeId)) {
            await fetchOneAsync(placeId);
        }
        return true;
    }

    const deleteAsync = async (id: string) => {
        const response = await axios.delete(getApiUrl("place") + "/" + id, {
            withCredentials: true
        });
        if (response.status !== 200) {
            return false;
        } else if (places.value?.some(p => p._id === id)) {
            places.value = places.value.filter(p => p._id !== id);
        }
        return true;
    }

    const updateReviewAsync = async (placeId: string, star: number) => {
        if (!!!authentication.userStore.userData) {
            return false;
        }
        const response = star > 0 ? await axios.post<string>(getApiUrl("place") + "/" + placeId + "/review", {
                star: star
            }, {
                withCredentials: true
            }) : await axios.delete(getApiUrl("place") + "/" + placeId + "/review", {
                withCredentials: true
            });
        if (response.status !== 200) {
            return false;
        }
        await fetchOneAsync(placeId);
        return true;
    }

    const addPlace = (newPlace: Place) => {
        if (!!!places.value) {
            places.value = [];
        }
        const existingPlace = places.value.find(i => i._id === newPlace._id);
        if (!!existingPlace) {
            Object.assign(existingPlace, newPlace);
        } else {
            places.value.push(newPlace);
        }
    }

    return {
        places: computed(() => places.value),
        fetchNextAsync,
        fetchOneAsync,
        createAsync,
        updateAsync,
        updateReviewAsync,
        deleteAsync,
    };
});