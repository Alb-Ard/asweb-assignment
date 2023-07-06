interface Place {
    readonly id: string,
    readonly owner: PlaceOwner
    readonly name: string,
    readonly location: [number, number],
    readonly photoSrcs: string[],
    readonly reviews: string[],
};

interface PlaceOwner {
    readonly id: string,
    readonly name: string,
}

export default Place;