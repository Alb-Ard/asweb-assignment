export const fetchPageSize = 10;

export const initializeIfEmptyAsync = async (elementsGetter: () => (any[] | undefined | null), store: { fetchNextAsync: () => any }) => {
    if (!areFetchedPagesComplete(elementsGetter())) {
        await store.fetchNextAsync();
    }
}

export const areFetchedPagesComplete = (elements: any[] | undefined | null) => !!elements && elements.length > 0 && (elements.length % fetchPageSize) === 0;

export const whileLoadingAsync = async <T>(loadingFlag: Ref<boolean>, promise: Promise<T>): Promise<T> => {
    loadingFlag.value = true;
    return await promise
        .then(v => { loadingFlag.value = false; return v; })
        .catch(v => { loadingFlag.value = false; return v; });
}