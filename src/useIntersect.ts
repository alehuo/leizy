import { useEffect, useRef, useState } from 'react';

interface UseIntersectParams {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

// https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5

export const useIntersect = ({
    root = null,
    rootMargin,
    threshold = 0,
}: UseIntersectParams): [React.Dispatch<Element>, IntersectionObserverEntry | Record<string, unknown>] => {
    const [entry, updateEntry] = useState<IntersectionObserverEntry | Record<string, unknown>>({});
    const [element, setElement] = useState<Element | null>(null);

    const intersectionObserver = useRef(
        new IntersectionObserver(([entry]) => updateEntry(entry), {
            root,
            rootMargin,
            threshold,
        }),
    );

    useEffect(() => {
        const { current: currentObserver } = intersectionObserver;
        currentObserver.disconnect();

        if (element != null) {
            currentObserver.observe(element);
        }

        return () => currentObserver.disconnect();
    }, [element]);

    return [setElement, entry];
};