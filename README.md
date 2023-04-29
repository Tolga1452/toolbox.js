# toolbox.js

## What is it?

A collection of useful functions for JavaScript & Typescript.

## Installation

```bash
npm install @tolga1452/toolbox.js
```

## Usage

### JavaScript

```js
const { randomNumber } = require('toolbox.js');
```

### TypeScript

```ts
import { randomNumber } from '@tolga1452/toolbox.js';
```

## Functions

[Jump to Types](#types)

- [**`convertToHex()`**](#converttohex): Converts a [decimal](#decimal) or [RGB](#rgb) color code to a [hexadecimal](#hexadecimal) color code.

- [**`convertToRGB()`**](#converttorgb): Converts a [hexadecimal](#hexadecimal) or [decimal](#decimal) color code to an [RGB](#rgb) color code.

- [**`convertToDecimal()`**](#converttodecimal): Converts a [hexadecimal](#hexadecimal) or [RGB](#rgb) color code to a [decimal](#decimal) color code.

- [**`randomNumber()`**](#randomnumber): Generates a random number between the given min and max.

- [**`links()`**](#links): Returns the links of the given string.

- [**`randomItem()`**](#randomitem): Returns a random item from the given array.

- [**`toMilliseconds()`**](#tomilliseconds): Converts any [time unit](#timeunit) to milliseconds.

- [**`check()`**](#check): Checks whether the given value is `true` or `false`. If the value is `true`, returns the first parameter, otherwise returns the second parameter.

- [**`shuffle()`**](#shuffle): Shuffles the given array.

- [**`chunk()`**](#chunk): Turns the given array into groups of the given size.

### `convertToHex()`

`convertToHex(color: Decimal | RGB): Hexadecimal)`

Converts a [decimal](#decimal) or [RGB](#rgb) color code to a [hexadecimal](#hexadecimal) color code.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `color` | [`Decimal`](#decimal) \| [`RGB`](#rgb) | The color code to convert. |

**Returns:** [`Hexadecimal`](#hexadecimal)

#### Example

```ts
import { convertToHex } from '@tolga1452/toolbox.js';

convertToHex(0x000000); // #000000
convertToHex([0, 0, 0]); // #000000
```

### `convertToRGB()`

`convertToRGB(color: Hexadecimal | Decimal): RGB`

Converts a [hexadecimal](#hexadecimal) or [decimal](#decimal) color code to an [RGB](#rgb) color code.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `color` | [`Hexadecimal`](#hexadecimal) \| [`Decimal`](#decimal) | The color code to convert. |

**Returns:** [`RGB`](#rgb)

#### Example

```ts
import { convertToRGB } from '@tolga1452/toolbox.js';

convertToRGB(0x000000); // [0, 0, 0]
convertToRGB('#000000'); // [0, 0, 0]
```

### `convertToDecimal()`

`convertToDecimal(color: Hexadecimal | RGB): Decimal`

Converts a [hexadecimal](#hexadecimal) or [RGB](#rgb) color code to a [decimal](#decimal) color code.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `color` | [`Hexadecimal`](#hexadecimal) \| [`RGB`](#rgb) | The color code to convert. |

**Returns:** [`Decimal`](#decimal)

#### Example

```ts
import { convertToDecimal } from '@tolga1452/toolbox.js';

convertToDecimal([0, 0, 0]); // 0
convertToDecimal('#000000'); // 0
```

### `randomNumber()`

`randomNumber(min: number, max: number): number`

Generates a random number between the given min and max.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `min` | `number` | The minimum number. |
| `max` | `number` | The maximum number. |

**Returns:** `number`

#### Example

```ts
import { randomNumber } from '@tolga1452/toolbox.js';

randomNumber(0, 10); // 5
```

### `links()`

`links(str: string): string[]`

Returns the links of the given string.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `str` | `string` | The string to get the links from. |

**Returns:** `string[]`

#### Example

```ts
import { links } from '@tolga1452/toolbox.js';

links("Check out my website: https://www.example.com"); // ["https://www.example.com"]
```

### `randomItem()`

`randomItem(arr: any[]): any`

Returns a random item from the given array.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `arr` | `any[]` | The array to get the item from. |

**Returns:** `any`

#### Example

```ts
import { randomItem } from '@tolga1452/toolbox.js';

randomItem(["red", "green", "blue"]); // "red"
```

### `toMilliseconds()`

`toMilliseconds(time: number, unit: TimeUnit): number`

Converts any [time unit](#timeunit) to milliseconds.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `time` | `number` | The time to convert. |
| `unit` | [`TimeUnit`](#timeunit) | The unit of the time. |

**Returns:** `number`

#### Example

```ts
import { toMilliseconds, TimeUnit } from '@tolga1452/toolbox.js';

toMilliseconds(1, TimeUnit.Seconds); // 1000
```

### `check()`

`check(value: any, ifTrue: any, ifFalse: any): any`

Checks whether the given value is `true` or `false`. If the value is `true`, returns the first parameter, otherwise returns the second parameter.

**Note:** You don't have to give a boolean to `value`. For example `"text"` is returns `true` and `""` is returns `false`, or `1` is returns `true` and `0` is returns `false`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `value` | `any` | The value to check. |
| `ifTrue` | `any` | The value to return if the value is `true`. |
| `ifFalse` | `any` | The value to return if the value is `false`. |

**Returns:** `any`

#### Example

```ts
import { check } from '@tolga1452/toolbox.js';

check(true, "Hello", "World"); // "Hello"
check(false, "Hello", "World"); // "World"
check("text", "Hello", "World"); // "Hello"
check("", "Hello", "World"); // "World"
```

### `shuffle()`

`shuffle(arr: any[]): any[]`

Shuffles the given array.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `arr` | `any[]` | The array to shuffle. |

**Returns:** `any[]`

#### Example

```ts
import { shuffle } from '@tolga1452/toolbox.js';

shuffle(["red", "green", "blue"]); // ["blue", "red", "green"]
```

### `chunk()`

`chunk(arr: any[], size: number): any[][]`

Turns the given array into groups of the given size.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `arr` | `any[]` | The array to chunk. |
| `size` | `number` | The size of the chunks. |

**Returns:** `any[][]`

#### Example

```ts
import { chunk } from '@tolga1452/toolbox.js';

chunk(["red", "green", "blue", "yellow", "orange"], 2); // [["red", "green"], ["blue", "yellow"], ["orange"]]
```

## Types

### `Decimal`

A Decimal color code is a number between 0 and 16777215 (0xFFFFFF).

```ts
export type Decimal = number;
```

### `RGB`

An RGB color code is an array of 3 numbers between 0 and 255.

```ts
export type RGB = [number, number, number];
```

### `Hexadecimal`

A Hexadecimal color code is a string that starts with a '#' and is followed by 6 hexadecimal characters.

```ts
export type Hexadecimal = `#${string}`;
```

### `TimeUnit`

The time units.

```ts
export enum TimeUnit {
    Milliseconds,
    Seconds,
    Minutes,
    Hours,
    Days,
    Weeks,
    Months,
    Years
};
```
