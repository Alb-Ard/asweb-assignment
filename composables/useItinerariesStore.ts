import axios from "axios";
import { getApiUrl } from "~/lib/api";
import { defineStore } from "pinia";
import Itinerary from "~/lib/types/itinerary";

export const useItinerariesStore = defineStore("itineraries", () => { 
    const itineraries = ref<Itinerary[] | undefined>(undefined);
    const authentication = useAuthentication();

    const fetchAsync = async (page: number) => {
        if (!!!authentication.userStore.userData) {
            return;
        }

        const response = await axios.get<Itinerary[]>(getApiUrl("itinerary") + "?page=" + page, {
            withCredentials: true
        });
        if (response.status !== 200) {
            return;
        }
        if (!!!itineraries.value) {
            itineraries.value = [...response.data];
        } else {
            response.data.forEach(addItinerary);
        }
    }

    const fetchOneAsync = async (id: string) => {
        if (!!!authentication.userStore.userData) {
            return;
        }

        const response = await axios.get<Itinerary>(getApiUrl("itinerary") + "/" + id, {
            withCredentials: true
        });
        if (response.status !== 200) {
            return;
        }
        if (!!!itineraries.value) {
            itineraries.value = [response.data];
        } else {
            addItinerary(response.data);
        }
    }

    const swapPlacesAsync = async (itineraryId: string, firstId: string, secondId: string) => {
        if (!!!authentication.userStore.userData) {
            return false;
        }
        // TODO: swap and fetch again
    }

    const addPlaceAsync = async (itineraryId: string, placeId: string) => {
        if (!!!authentication.userStore.userData) {
            return false;
        }

        const response = await axios.put(getApiUrl("itinerary") + "/" + itineraryId + "/places", {
            id: placeId
        }, {
            withCredentials: true
        });
        if (response.status !== 200) {
            return false;
        }
        await fetchOneAsync(itineraryId);
        return true;
    }

    const addItinerary = (newItinerary: Itinerary) => {
        if (!!!itineraries.value) {
            itineraries.value = [];
        }
        const existingItinerary = itineraries.value.find(i => i.id === newItinerary.id);
        if (!!existingItinerary) {
            Object.assign(existingItinerary, newItinerary);
        } else {
            itineraries.value.push(newItinerary);
        }
    }

    watchEffect(() => {
        if (!!!authentication.userStore.userData) {
            itineraries.value = undefined;
        }
    })

    return {
        itineraries: computed(() => itineraries.value),
        fetchAsync,
        fetchOneAsync,
        swapPlacesAsync,
        addPlaceAsync,
    };
});