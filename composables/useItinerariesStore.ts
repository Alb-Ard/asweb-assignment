import axios from "axios";
import { getApiUrl } from "~/lib/api";
import { defineStore } from "pinia";
import Itinerary from "~/lib/types/itinerary";
import { areFetchedPagesComplete } from "~/lib/dataStore";

export const useItinerariesStore = defineStore("itineraries", () => { 
    const itineraries = ref<Itinerary[] | undefined>(undefined);
    const page = ref(0);
    const authentication = useAuthentication();

    const fetchNextAsync = async () => {
        try {
            if (!!!authentication.userStore.userData) {
                return;
            }
    
            const response = await axios.get<Itinerary[]>(getApiUrl("itinerary") + "?page=" + page.value, {
                withCredentials: true
            });
            if (response.status !== 200) {
                return;
            }
            if (areFetchedPagesComplete(response.data)) {
                page.value++;
            }
            if (!!!itineraries.value) {
                itineraries.value = [...response.data];
            } else {
                response.data.forEach(addItinerary);
            }
        } catch (error) {
            
        }
    }

    const fetchOneAsync = async (id: string) => {
        try {
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
        } catch (error) {
            
        }
    }

    const createAsync = async (name: string) => {
        let response;
        try {
            if (!!!authentication.userStore.userData) {
                return false;
            }
    
            response = await axios.post<string>(getApiUrl("itinerary"), {
                name: name,
                owner: authentication.userStore.userData._id
            }, {
                withCredentials: true
            });
            if (response.status !== 200) {
                return false;
            }
        } catch (error) {
            return false;
        }
        await fetchOneAsync(response.data);
        return true;
    }

    const updateAsync = async (itinerary: Partial<Itinerary> & { _id: string }) => {
        const { _id: itineraryId, ...itineraryData } = itinerary;
        try {
            if (!!!authentication.userStore.userData) {
                return false;
            }
    
            const response = await axios.patch(getApiUrl("itinerary") + "/" + itineraryId, itineraryData, {
                withCredentials: true
            });
            if (response.status !== 200) {
                return false;
            } 
        } catch (error) {
            return false;
        }
        if (itineraries.value?.some(p => p._id === itineraryId)) {
            await fetchOneAsync(itineraryId);
        }
        return true;
    }

    const deleteAsync = async (id: string) => {
        try {
            if (!!!authentication.userStore.userData) {
                return false;
            }
    
            const response = await axios.delete(getApiUrl("itinerary") + "/" + id, {
                withCredentials: true
            });
            if (response.status !== 200) {
                return false;
            }
            itineraries.value = itineraries.value?.filter(i => i._id !== id);
        } catch (error) {
            return false;
        }
        return true;
    }

    const addPlaceAsync = async (itineraryId: string, placeId: string) => {
        try {
            if (!!!authentication.userStore.userData) {
                return false;
            }
    
            const response = await axios.post(getApiUrl("itinerary") + "/" + itineraryId + "/places", {
                id: placeId
            }, {
                withCredentials: true
            });
            if (response.status !== 200) {
                return false;
            } 
        } catch (error) {
            return false;
        }
        if (itineraries.value?.some(p => p._id === itineraryId)) {
            await fetchOneAsync(itineraryId);
        }
        return true;
    }

    const swapPlacesAsync = async (itineraryId: string, firstId: string, secondId: string) => {
        try {
            if (!!!authentication.userStore.userData) {
                return false;
            }
    
            const response = await axios.patch(getApiUrl("itinerary") + "/" + itineraryId + "/places", {
                swapPlaces: [firstId, secondId]
            }, {
                withCredentials: true
            });
            if (response.status !== 200) {
                return false;
            } 
        } catch (error) {
            return false;
        }
        if (itineraries.value?.some(p => p._id === itineraryId)) {
            await fetchOneAsync(itineraryId);
        }
        return true;
    }

    const removePlaceAsync = async (itineraryId: string, placeId: string) => {
        try {
            if (!!!authentication.userStore.userData) {
                return false;
            }
    
            const response = await axios.delete(getApiUrl("itinerary") + "/" + itineraryId + "/places/" + placeId, {
                withCredentials: true
            });
            if (response.status !== 200) {
                return false;
            }
        } catch (error) {
            return false;
        }
        if (itineraries.value?.some(p => p._id === itineraryId)) {
            await fetchOneAsync(itineraryId);
        }
        return true;
    }

    const addItinerary = (newItinerary: Itinerary) => {
        if (!!!itineraries.value) {
            itineraries.value = [];
        }
        const existingItinerary = itineraries.value.find(i => i._id === newItinerary._id);
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
        fetchNextAsync,
        fetchOneAsync,
        createAsync,
        updateAsync,
        deleteAsync,
        addPlaceAsync,
        swapPlacesAsync,
        removePlaceAsync,
    };
});