import axios from "axios";
import { defineStore } from "pinia";
import { getApiUrl } from "~/lib/api";
import Place from "~/lib/types/place";

export const usePlacesStore = defineStore("places", () => { 
    const places = ref<Place[] | undefined>(undefined);

    const fetchAsync = async (page: number) => {
        const response = await axios.get<Place[]>(getApiUrl("place") + "?page=" + page);
        if (response.status !== 200) {
            return;
        }
        response.data.forEach(addPlace);
    };

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
        fetchAsync,
    };
});