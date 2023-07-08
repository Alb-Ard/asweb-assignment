import Owner from "./owner";

interface Place {
    readonly _id: string,
    readonly owner: Owner
    readonly name: string,
    readonly description: string,
    readonly location: [number, number],
    readonly photoSrcs: string[],
    readonly reviews: PlaceReview[],
};

interface PlaceReview {
    readonly _id: string,
    readonly user: Owner,
    readonly star: number,
}

export default Place;
export {
    PlaceReview
};