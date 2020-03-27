# Leizy

[Code coverage] [Build passing] [Open source] [npmjs version]

## Introduction

Leizy lazy loads your components when the component comes into the viewport. Powered by the intersection observer :fire::fire:

Read more about the intersection observer here: https://www.w3.org/TR/intersection-observer/

## Why?

Initial loading of React components can sometimes slow your app down. If your components do some heavy lifting under the hood, e.g. fetching data or loading five hundred cat pictures at once (while the viewport can only show 20 full pictures at once) is not efficient.

## How?

Leizy is a React component that creates an Intersection observer hook. Leize prevents the wrapped component from rendering initially if it's not visible on the viewport (by a certain amount). The user can customize the threshold when the component will render on the DOM. The fallback component (which is shown if the component doesn't pass the threshold value set by the user) can be also configured manually. Leizy uses an outer ref on a div component and the default fallback component is just a plain React fragment.

## Installation

1. Run `npm install leizy --save`. TypeScript typings are included in the library.
2. Import Leizy in your code

```typescript
import { Loadable } from 'leizy';
```

3. Wrap your component in a Loadable

```typescript
import { Loadable } from 'leizy';

const LazyLoadedCatPictureContainer = () => <Loadable><CatPicture/></Loadable>
```

Optionally, you can use the `component` prop to set your component, like so:

```typescript
import { Loadable } from 'leizy';

const LazyLoadedCatPictureContainer = () => <Loadable component={<CatPicture/>}/>
```

## Configuring Leizy

### Custom fallback component

You can insert a custom fallback component:

```typescript
import { Loadable } from 'leizy';

const LazyLoadedCatPictureContainer = () => <Loadable fallback={<div>Loading...</div>}><CatPicture/></Loadable>
```

### Custom render threshold

You can customize the rendering threshold of Leizy. In this example, a value of 0.8 is shown. It means, that if more than 80% of the component is visible on the page/document, the inner component will render.

```typescript
import { Loadable } from 'leizy';

const LazyLoadedCatPictureContainer = () => <Loadable threshold={0.8}><CatPicture/></Loadable>
```

Leizy is extremely powerful if you want to implement a scrolling view or your page has so much content that it needs to be scrolled down.

## Known issues

- The intersection observer hook continues to re-render the component even if the ref has been cleared

## Contributing

Please open an issue if you find a bug in the library. Contributions are welcome!

## License

MIT license
