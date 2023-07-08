export type DragDropElement = { readonly id: string } | { readonly _id: string };

export interface DragDropData {
    readonly type: string,
    readonly value: DragDropElement,
};

export interface ReorderableElement<T extends DragDropElement> {
    readonly element: T
}