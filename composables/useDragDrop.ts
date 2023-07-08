import { DragDropData, DragDropElement } from "~/lib/types/dragDropTypes";

type DropCallback<TSource extends DragDropElement, TTarget extends DragDropElement, TReturn> = (sourceItem: TSource, targetItem: TTarget, collectionId?: string) => TReturn;

interface DragDropOptions<TSource extends DragDropElement, TTarget extends DragDropElement> {
    readonly acceptedTypes?: string[],
    readonly collectionId?: string,
    readonly filterElement?: DropCallback<TSource, TTarget, boolean>,
}

export const useDragDrop = <TSource extends DragDropElement, TTarget extends DragDropElement>(elementType: string,
    onDropped: DropCallback<TSource, TTarget, void>,
    options?: DragDropOptions<TSource, TTarget>) => {

    function onStartDragging(draggedElement: TSource, startEvent: DragEvent) {
        const dragData: DragDropData = {
            type: elementType,
            value: draggedElement
        };
        startEvent.dataTransfer!.setData("application/json", JSON.stringify(dragData));
        startEvent.dataTransfer!.effectAllowed = "move";
    }
        
    function canDropOntoItem(overEvent: DragEvent) {
        if (!!!overEvent.dataTransfer) {
            return;
        }
        const hasJsonData = overEvent.dataTransfer.types.find(t => t === "application/json");
        overEvent.dataTransfer.dropEffect = hasJsonData ? "move" : "none";
        if (hasJsonData) {
            overEvent.preventDefault();
        }
    }

    function onDropEvent(targetElement: TTarget, dropEvent: DragEvent) {
        const dragDataJson = dropEvent.dataTransfer?.getData("application/json");
        if (!!!dragDataJson) {
            console.error("No dragdrop data");
            return;
        }
        const dragData: DragDropData = JSON.parse(dragDataJson) as DragDropData;
        if (!!!dragData) {
            console.error("Invalid dragdrop data: " + dragDataJson);
            return;
        }
        const customAcceptedTypes = options?.acceptedTypes;
        if (!!customAcceptedTypes ? !options.acceptedTypes!.includes(dragData.type) : dragData.type !== elementType) {
            console.error("Invalid dragdrop data target: " + dragData.type + " [Accepts " + (options?.acceptedTypes ?? elementType) + "]");
            return;
        }
        const sourceElement = dragData.value as TSource;
        if (!!!sourceElement) {
            console.error("No drop source element");
            return;
        }
        if (!!options?.filterElement && !options.filterElement(sourceElement, targetElement, options.collectionId)) {
            console.log("Element filtered.");
            return;
        }
        dropEvent.preventDefault();
        onDropped(sourceElement, targetElement, options?.collectionId);
        dropEvent.dataTransfer!.clearData();
    }

    return {
        onStartDragging,
        canDropOntoItem,
        onDropEvent
    }
}