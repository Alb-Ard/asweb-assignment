export const fetchPageSize = 10;

export const initializeIfEmptyAsync = async (elementsGetter: () => (any[] | undefined | null), store: { fetchNextAsync: () => any }) => {
    if (!areFetchedPagesComplete(elementsGetter())) {
        await store.fetchNextAsync();
    }
}

export const areFetchedPagesComplete = (elements: any[] | undefined | null) => !!elements && elements.length > 0 && (elements.length % fetchPageSize) === 0;

export const whileLoadingAsync = <T>(loadingFlag: Ref<boolean>, promise: Promise<T>, failValue: T): Promise<T> => {
    loadingFlag.value = true;
    return promise
        .then(v => { loadingFlag.value = false; return v; })
        .catch(() => { loadingFlag.value = false; return failValue; });
}