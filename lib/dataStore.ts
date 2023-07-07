export const fetchPageSize = 10;

export const initializeIfEmpty = (elementsGetter: () => (any[] | undefined | null), store: { fetchNextAsync: () => any }) => {
    if (!areFetchedPagesComplete(elementsGetter())) {
        store.fetchNextAsync();
    }
}

export const areFetchedPagesComplete = (elements: any[] | undefined | null) => !!elements && elements.length > 0 && (elements.length % fetchPageSize) === 0;