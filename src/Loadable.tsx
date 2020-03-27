import React, { useState } from 'react';
import { useIntersect } from './useIntersect';

export interface LoadableProps {
    children?: React.ReactChild;
    fallback?: React.ReactElement;
    threshold?: number;
    component?: React.ReactElement;
    isVisible?: boolean;
}

const showComponent = (
    visible: boolean,
    fallback?: React.ReactElement,
    component?: React.ReactElement,
    children?: React.ReactChild,
) => {
    if (!visible) {
        if (fallback === undefined) {
            return <React.Fragment />;
        }
        return fallback;
    }
    // Render order: children --> component
    if (children !== undefined) {
        return <>{children}</>;
    }
    if (component !== undefined) {
        return component;
    }
    return <div />;
};

/**
 * Validates the props of the component.
 * @param fallback Fallback component
 * @param component Render component
 * @param children Render component (as a children of the Loadable component)
 */
const check = (fallback?: React.ReactElement, component?: React.ReactElement, children?: React.ReactChild) => {
    if (children !== undefined && Array.isArray(children)) {
        throw new Error(
            '<Loadable/> excepts its ´children´ prop to be a single React element. Remember to wrap your child elements into a fragment or something else, if you are supposed to lazy load multiple instances of the child components at once.',
        );
    }
    if (component !== undefined && Array.isArray(component)) {
        throw new Error(
            '<Loadable/> excepts its ´component´ prop to be a single React element. Remember to wrap your components into a fragment or something else, if you are supposed to lazy load multiple instances of the component at once.',
        );
    }
    if (fallback !== undefined && Array.isArray(fallback)) {
        throw new Error(
            '<Loadable/> excepts its ´fallback´ prop to be a single React element. Remember to wrap your fallback components into a fragment or something else, if you are supposed to fallback into multiple instances of the component at once.',
        );
    }
};

/**
 * Loadable component.
 */
export const Loadable: React.FC<LoadableProps> = ({ children, fallback, component, threshold = 0.8 }) => {
    // Check for prop errors
    check(fallback, component, children);

    // Intersection hook
    const [setNode, entry] = useIntersect({ threshold, rootMargin: '0px' });

    // Render check hook
    const [firstTimeRender, setFirstTimeRender] = useState(false);

    const canShow = (entry as IntersectionObserverEntry).intersectionRatio > threshold;

    // Update first time render hook
    if (canShow && !firstTimeRender) {
        setFirstTimeRender(true);
    }

    // If we have rendered the component for the first time, there is no need to show the fallback component.
    // Also, observing the intersection of the component is no longer necessary
    return firstTimeRender === true ? (
        <div style={{ display: 'inline-block', padding: 0, margin: 0 }}>
            {showComponent(true, fallback, component, children)}
        </div>
    ) : (
        <div
            ref={(elem) => {
                // Set a ref for the intersection observer
                if (elem !== null) {
                    setNode(elem);
                }
            }}
            style={{ display: 'inline-block', padding: 0, margin: 0 }}
        >
            {showComponent(canShow, fallback, component, children)}
        </div>
    );
};
