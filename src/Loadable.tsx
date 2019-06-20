import React from 'react';

export interface LoadableProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
}

export const Loadable: React.FC<LoadableProps> = ({ children }) => {
    return <>{children}</>;
};
