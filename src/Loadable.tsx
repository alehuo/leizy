import React from 'react';

export interface LoadableProps {
    children?: React.ReactChild;
    fallback?: React.ReactElement;
    component?: React.ReactElement;
    isVisible?: boolean;
}

export const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: [],
};

export const Loadable: React.FC<LoadableProps> = ({ children, isVisible, fallback, component }) => {
    if (children !== undefined && Array.isArray(children)) {
        throw new Error(
            '<Loadable/> excepts its ´children´ prop to be a single React element. Remember to wrap your child elements into a <React.Fragment></React.Fragment> or something else, if you are supposed to lazy load multiple instances of the child components at once.',
        );
    }
    if (component !== undefined && Array.isArray(component)) {
        throw new Error(
            '<Loadable/> excepts its ´component´ prop to be a single React element. Remember to wrap your components into a <React.Fragment></React.Fragment> or something else, if you are supposed to lazy load multiple instances of the component at once.',
        );
    }
    if (fallback !== undefined && Array.isArray(fallback)) {
        throw new Error(
            '<Loadable/> excepts its ´fallback´ prop to be a single React element. Remember to wrap your fallback components into a <React.Fragment></React.Fragment> or something else, if you are supposed to fallback into multiple instances of the component at once.',
        );
    }
    if (!isVisible) {
        return fallback ? fallback : <React.Fragment />;
    }

    return <>{component ? component : children}</>;
};
