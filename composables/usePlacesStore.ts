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

    const createPlaceAsync = async (name: string, location: [number, number]) => {
        if (!!!authentication.userStore.userData) {
            return false;
        }
        const response = await axios.post(getApiUrl("place"), {
            name: name,
            owner: authentication.userStore.userData.id,
            location: location,
        }, {
            withCredentials: true
        });
        return response.status === 200;
    }

    const updatePlaceAsync = async (place: Partial<Place> & { id: string }) => {
        const { id: placeId, ...placeData } = place;
        const response = await axios.patch(getApiUrl("place") + "/" + placeId, placeData, {
            withCredentials: true
        });
        if (response.status !== 200) {
            return false;
        } else if (places.value?.some(p => p.id === placeId)) {
            await fetchOneAsync(placeId);
        }
        return true;
    }

    const deletePlaceAsync = async (id: string) => {
        const response = await axios.delete(getApiUrl("place") + "/" + id, {
            withCredentials: true
        });
        if (response.status !== 200) {
            return false;
        } else if (places.value?.some(p => p.id === id)) {
            places.value = places.value.filter(p => p.id !== id);
        }
        return true;
    }

    const addPlace = (newPlace: Place) => {
        if (!!!places.value) {
            places.value = [];
        }
        const existingPlace = places.value.find(i => i.id === newPlace.id);
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
        createPlaceAsync,
        updatePlaceAsync,
        deletePlaceAsync,
    };
});