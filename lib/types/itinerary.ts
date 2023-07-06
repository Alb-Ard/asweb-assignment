interface Itinerary {
    readonly id: string,
    readonly name: string,
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