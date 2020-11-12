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

const styles = {
    display: "inline-block",
    width: 120,
    height: 120,
    margin: 10
};

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
            {range(10).map((_val,i) => (
                <Placeholder key={i}/>
            ))}
            <Loadable fallback={<Fallback />} component={<LoadedPlaceholder />} />
            {range(5).map((_val, i) => (
                <Placeholder key={10 + i}/>
            ))}
        </Scroll>
    ))
    .add('Single loadable component with other components #2', () => (
        <Scroll>
            {range(10).map(num => (
                <Placeholder key={num} />
            ))}
            <Loadable fallback={<Fallback />} style={styles}>
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
                <Loadable fallback={<Fallback />} key={num} style={styles}>
                    <LoadedPlaceholder />
                </Loadable>
            ))}
            <Loadable fallback={<Fallback />} key={100} style={styles}>
                <Counter />
            </Loadable>
        </Scroll>
    ))
    .add('Single loadable component with other components #4', () => (
        <Scroll>
            {range(10).map(num => (
                <Placeholder key={num} />
            ))}
            <Loadable fallback={<Fallback />} style={styles}>
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
                <Loadable fallback={<Fallback />} key={num} style={styles}>
                    <MockedFetchComponent />
                </Loadable>
            ))}
        </Scroll>
    ))
    .add('Error case 1, with multiple children', () => (
        <Loadable fallback={<Fallback />} style={styles}>
            <LoadedPlaceholder />
            <LoadedPlaceholder />
        </Loadable>
    ))
    .add('Error case 2, with multiple components in fallback prop', () => (
        <Loadable
            // @ts-expect-error Should throw
            fallback={[0, 1].map((_val, i) => (
                <Fallback key={i}/>
            ))}
            style={styles}
        >
            <LoadedPlaceholder />
        </Loadable>
    ))
    .add('Error case 3, with multiple components in component prop', () => (
        <Loadable
            // @ts-expect-error Should throw
            component={[0, 1].map((_val, i) => (
                <Fallback key={i}/>
            ))}
            style={styles}
        />
    ));
