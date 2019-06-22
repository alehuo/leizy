import React from 'react';
import { storiesOf } from '@storybook/react';

import { Loadable } from '../src/Loadable';
import {
    LoadedPlaceholder,
    Fallback,
    Scroll,
    Placeholder,
    Counter,
    MockedFetchComponent,
    range,
} from './storybookUtils';

storiesOf('Loadable', module)
    .add('Single loadable component', () => (
        <Loadable>
            <LoadedPlaceholder />
        </Loadable>
    ))
    .add('Single loadable component with a custom fallback component', () => (
        <Loadable fallback={<Fallback />}>
            <LoadedPlaceholder />
        </Loadable>
    ))
    .add('Single loadable component with other components #1', () => (
        <Scroll>
            {range(10).map(() => (
                <Placeholder />
            ))}
            <Loadable fallback={<Fallback />} component={<LoadedPlaceholder />} />
            {range(5).map(() => (
                <Placeholder />
            ))}
        </Scroll>
    ))
    .add('Single loadable component with other components #2', () => (
        <Scroll>
            {range(10).map(num => (
                <Placeholder key={num} />
            ))}
            <Loadable fallback={<Fallback />}>
                <LoadedPlaceholder />
            </Loadable>
            {range(5).map(num => (
                <Placeholder key={num + 11} />
            ))}
        </Scroll>
    ))
    .add('Single loadable component with other components #3', () => (
        <Scroll>
            {range(50).map(num => (
                <Loadable fallback={<Fallback />} key={num}>
                    <LoadedPlaceholder />
                </Loadable>
            ))}
            <Loadable fallback={<Fallback />} key={100}>
                <Counter />
            </Loadable>
        </Scroll>
    ))
    .add('Single loadable component with other components #4', () => (
        <Scroll>
            {range(10).map(num => (
                <Placeholder key={num} />
            ))}
            <Loadable fallback={<Fallback />}>
                <LoadedPlaceholder />
            </Loadable>
            {range(5).map(num => (
                <Placeholder key={11 + num} />
            ))}
        </Scroll>
    ))
    .add('Multiple loadable components that fetch data', () => (
        <Scroll>
            {range(100).map(num => (
                <Loadable fallback={<Fallback />} key={num}>
                    <MockedFetchComponent />
                </Loadable>
            ))}
        </Scroll>
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
