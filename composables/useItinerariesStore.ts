import axios from "axios";
import { defineStore } from "pinia";
import Itinerary from "~/lib/types/itinerary";

export const useItinerariesStore = defineStore("itineraries", () => { 
    const itineraries = ref<Itinerary[] | undefined>(undefined);
    const authentication = useAuthentication();

    const fetchAsync = async (page: number) => {
        if (!!!authentication.userStore.userData) {
            return;
        }
        const itineraryPlaces = [
            {
                id: "0",
                name: "Place 0",
                location: [47.42022, -1.219482] as [number, number]
            },
            {
                id: "1",
                name: "Place 1",
                location: [47.52022, -1.319482] as [number, number]
            },
            {
                id: "2",
                name: "Place 2",
                location: [47.48022, -1.299482] as [number, number]
            },
            {
                id: "3",
                name: "Place 3",
                location: [47.62022, -1.219482] as [number, number]
            },
            {
                id: "4",
                name: "Place 4",
                location: [47.42922, -1.279482] as [number, number]
            }
        ];

        const newItineraries = [
            {
                id: "0",
                name: "Trip 1",
                places: [...itineraryPlaces],
            },
            {
                id: "1",
                name: "Trip 2",
                places: [...itineraryPlaces],
            },
            {
                id: "2",
                name: "Trip 3",
                places: [...itineraryPlaces],
            }
        ];

        if (!!!itineraries.value) {
            itineraries.value = [...newItineraries];
        } else {
            newItineraries.forEach(addItinerary);
        }
    }

    const fetchOneAsync = async (id: string) => {
        // TODO: fetch
    }

    const swapPlacesAsync = async (itineraryId: string, firstId: string, secondId: string) => {
        // TODO: swap and fetch again
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
    };
});