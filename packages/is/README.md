# @pbbbl/is

## A rewritten module/fork of [is](https://www.npmjs.com/package/is)

Rewritten for Typescript, ES6 and beyond. Working on tree-shakable imports (future).

### Key Differences

#### Tree Shakable-*ish*

This is a work in progress as my es skills are growing.

#### Typed (Typescript)

Rewritten in Typescript.

##### Improved Types

I realize a strongly-typed application shouldn't need `is`, but it is needed in some edge-cases.
..
`@types/is` has out-of-date types, or types not found by Typescript.
Using `is.nil` (the non-deprecated replacement for `is.null`) will throw an error in ts files.

- The same issue is present with other now-deprecated methods ()

Using "submethods" ( `is.[method].[sub-method]` ) like `is.array.empty` in a `.ts` file will throw errors.

#### ES6+, CJS, TS compatible

Again, a work in progress due to my underwhelming TS skills.

#### Example of Syntax Differences

Take this example where will would check if `const checkNull=null;` is a `null` value...

#### With [is](https://www.npmjs.com/package/is)

```js
// In CJS
const is = require('is');
// In ES, TS modules
// import is from 'is';

const checkNull:boolean = is.nil(null); // checkNull=true
```

##### With @pbbbl/is

```js
// In CJS
const {isNull} = require('@pbbbl/is');
// In ES, TS modules
// import {isNull} from '@pbbbl/is';

const checkNull:boolean = isNull(null); // checkNull=true
```

## Methods

```ts
isActualNaN (value:any):boolean;
```

```ts
// check if value is type
isType(value:any, type:string):boolean;

// Same as isType. Replaces is.a which is the non-deprecated version of `is.type`
isA(value:any, type:string):boolean;
```

```ts
isDefined (value:any):boolean;
```

```ts
isEmpty(value:any):boolean;
```

```ts
isEmptyString(value:any, trimmed:boolean):boolean;
```

```ts
isEqual(value:any, other:any):boolean;
```

```ts
isHosted (value:any, host:any):boolean;
```

```ts
isInstance (value:any, constructor:any):boolean;
```

```ts
isInstanceOf (value:any, constructor:any):boolean;
```

```ts
isNull (value:any):boolean;
```

```ts
isNil (value:any):boolean;
```

```ts
isUndefined (value:any):boolean;
```

```ts
isUndef (value:any):boolean;
```

```ts
isArguments (value:any):boolean;
```

```ts
isArray(value:any):boolean;
```

```ts
isArgumentsEmpty (value:any):boolean;
```

```ts
isEmptyArguments (value:any):boolean;
```

```ts
isEmptyArray(value:any):boolean;
```

```ts
isArrayEmpty(value:any):boolean;
```

```ts
isArrayLike (value:any):boolean;
```

```ts
isBool (value:any):boolean;
```

```ts
isBoolean (value:any):boolean;
```

```ts
isFalse(value:any):boolean;
```

```ts
isTrue(value:any):boolean;
```

```ts
isDate(value:any):boolean;
```

```ts
isDateValid(value:any):boolean;
```

```ts
isValidDate(value:any):boolean;
```

```ts
isElement (value:any):boolean;
```

```ts
isError (value:any):boolean;
```

```ts
isFunction (value:any):boolean;
```

```ts
isFn (value:any):boolean;
```

```ts
isNumber (value:any):boolean;
```

```ts
isInfinite (value:any):boolean;
```

```ts
isDecimal (value:any):boolean;
```

```ts
isDivisibleBy (value:any, n:number):boolean;
```

```ts
isInt (value:any):boolean;
```

```ts
isInteger (value:any):boolean;
```

```ts
isMaximum (value:any, others:any[]):boolean;
```

```ts
isMinimum (value:any, others:any[]):boolean;
```

```ts
isNaN (value:any):boolean;
```

```ts
isEven(value:any) ;
```

```ts
isOdd (value:any):boolean;
```

```ts
isGe (value:any,other:any):boolean;
```

```ts
isGt (value:any,other:any):boolean;
```

```ts
isLe(value:any,other:any):boolean;
```

```ts
isLt (value:any,other:any):boolean;
```

```ts
isWithin (value:number, start:number, finish:number):boolean;
```

```ts
isObject(value:any):boolean;
```

```ts
isEmptyObject(value:any):boolean;
```

```ts
isPrimitive(value:any):boolean;
```

```ts
isHash(value:any):boolean;
```

```ts
isRegexp (value:any):boolean;
```

```ts
isString (value:any):boolean;
```

```ts
isStringEmpty(value:any):boolean;
```

```ts
isBase64 (value:any):boolean;
```

```ts
isHex(value:any):boolean;
```

```ts
isSymbol (value:any):boolean;
```

```ts
isBigInt (value:any):boolean;
```

```ts
isJSON (value:any):boolean;
```

<!-- 
Congrats! You just saved yourself hours of work by bootstrapping this project with TSDX. Let's get you oriented with what's here and how to use it.

> This TSDX setup is meant for developing libraries (not apps!) that can be published to NPM. If you're looking to build a Node app, you could use `ts-node-dev`, plain `ts-node`, or simple `tsc`.

> If you're new to TypeScript, checkout [this handy cheatsheet](https://devhints.io/typescript)

## Commands

TSDX scaffolds your new library inside `/src`.

To run TSDX, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/src
  index.tsx       # EDIT THIS
/test
  blah.test.tsx   # EDIT THIS
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
```

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np). --> -->
