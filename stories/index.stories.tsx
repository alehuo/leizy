import React from 'react';

import { storiesOf } from '@storybook/react';

import { Loadable } from '../src/Loadable';

const range = (len: number) => [...Array(len).keys()];

const Placeholder = () => (
    <div style={{ width: 120, height: 120, background: 'yellow', display: 'inline-block', margin: 10 }}>
        Some other component
    </div>
);

const Fallback = () => (
    <div style={{ width: 120, height: 120, background: 'red', display: 'inline-block', margin: 10 }}>Placeholder</div>
);

const LoadedPlaceholder = () => (
    <div style={{ width: 120, height: 120, background: 'yellow', display: 'inline-block', margin: 10 }}>
        Loaded placeholder
    </div>
);

storiesOf('Loadable', module)
    .add('Visible', () => (
        <Loadable isVisible>
            <div style={{ width: 120, height: 120, background: 'green' }}>Loaded component</div>
        </Loadable>
    ))
    .add('With fallback', () => (
        <Loadable fallback={<div style={{ width: 120, height: 120, background: 'red' }}>Fallback component</div>}>
            <div style={{ width: 120, height: 120, background: 'green' }}>Loaded component</div>
        </Loadable>
    ))
    .add('Hidden, scroll to bottom to load (with component in `component` prop)', () => (
        <div style={{ height: 250, width: 550, overflowY: 'scroll' }}>
            {range(10).map(() => (
                <Placeholder />
            ))}
            <Loadable fallback={<Fallback />} component={<LoadedPlaceholder />} />
            {range(5).map(() => (
                <Placeholder />
            ))}
        </div>
    ))
    .add("Hidden, scroll to bottom to load (with component as the <Loadable/> component's children)", () => (
        <div style={{ height: 250, width: 550, overflowY: 'scroll' }}>
            {range(10).map(() => (
                <Placeholder />
            ))}
            <Loadable fallback={<Fallback />}>
                <LoadedPlaceholder />
            </Loadable>
            {range(5).map(() => (
                <Placeholder />
            ))}
        </div>
    ))
    .add('Error case 1, with multiple children', () => (
        // @ts-ignore
        <Loadable fallback={<Fallback />}>
            <LoadedPlaceholder />
            <LoadedPlaceholder />
        </Loadable>
    ))
    .add('Error case 2, with multiple components in fallback prop', () => (
        <Loadable
            // @ts-ignore
            fallback={[0, 1].map(() => (
                <Fallback />
            ))}
        >
            <LoadedPlaceholder />
        </Loadable>
    ))
    .add('Error case 3, with multiple components in component prop', () => (
        <Loadable
            // @ts-ignore
            component={[0, 1].map(() => (
                <Fallback />
            ))}
        />
    ));
