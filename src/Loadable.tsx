import React from 'react';

export interface LoadableProps {
    children?: React.ReactChild | React.ReactChild[];
    fallback?: React.ReactElement;
}

export const Loadable: React.FC<LoadableProps> = ({ children }) => {
    return <>{children}</>;
};
