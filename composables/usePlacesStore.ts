import { defineStore } from "pinia";
import Place from "~/lib/types/place";

export const usePlacesStore = defineStore("places", () => { 
    const places = ref<Place[] | undefined>(undefined);

    const fetchAsync = async (page: number) => {
        places.value = [
            {
                id: "0",
                name: "Place 0",
                owner: { id: "0", name: "Dave" },
                location: [47.41322, -1.219482] as [number, number],
                photoSrcs: [],
                reviews: [],
            },
            {
                id: "1",
                name: "Place 1",
                owner: { id: "1", name: "Luis" },
                location: [47.42022, -1.219482] as [number, number],
                photoSrcs: [],
                reviews: [],
            },
            {
                id: "2",
                name: "Place 2",
                owner: { id: "2", name: "Rob" },
                location: [47.41322, -1.210482] as [number, number],
                photoSrcs: [],
                reviews: [],
            }
        ];
    };
    
    return {
        places: computed(() => places.value),
        fetchAsync,
    };
});