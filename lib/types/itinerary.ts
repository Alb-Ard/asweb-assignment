import Owner from "./owner";

interface Itinerary {
    readonly id: string,
    readonly name: string,
    readonly owner: Owner
    readonly places: ItineraryPlace[],
}

interface ItineraryPlace {
    readonly id: string,
    readonly name: string,
    readonly location: [number, number]
}

export default Itinerary;
export {
    ItineraryPlace
};