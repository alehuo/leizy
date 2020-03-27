import React, { useEffect, useState } from 'react';

export const range = (len: number) => [...Array(len).keys()];

export const Placeholder: React.FC = () => (
    <div style={{ width: 120, height: 120, background: 'yellow', display: 'inline-block', margin: 10 }}>
        Some other component
    </div>
);

export const Fallback: React.FC = () => (
    <div style={{ width: 120, height: 120, background: 'red', display: 'inline-block', margin: 10 }}>Placeholder</div>
);

interface LoadedPlaceholderProps {
    childen?: React.ReactChildren;
}

export const LoadedPlaceholder: React.FC<LoadedPlaceholderProps> = ({ children }) => (
    <div style={{ width: 120, height: 120, background: 'green', display: 'inline-block', margin: 10 }}>
        {children ? children : 'Loaded component'}
    </div>
);

export const Scroll: React.FC = ({ children }) => (
    <div style={{ height: 400, width: '50%', overflowY: 'scroll' }}>{children}</div>
);

const mockRequest = () =>
    new Promise<string>((resolve, reject) => setTimeout(() => resolve('Yeah!'), 500 + Math.random() * 1200));

export const MockedFetchComponent: React.FC = () => {
    const [requestData, setRequestData] = useState('');
    let isLoaded = true;
    useEffect(() => {
        mockRequest().then(res => {
            if (isLoaded) {
                setRequestData(res);
            }
        });
        return () => {
            !isLoaded;
        };
    }, []);

    return (
        <div
            style={{
                width: 120,
                height: 120,
                background: requestData === '' ? 'yellow' : 'green',
                display: 'inline-block',
                margin: 10,
            }}
        >
            {requestData === '' ? 'Loading...' : requestData}
        </div>
    );
};

export const Counter: React.FC = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count + 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    });
    return (
        <div style={{ width: 120, height: 120, background: 'green', display: 'inline-block', margin: 10 }}>{count}</div>
    );
};
