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

- [**`isDecimal()`**](#isdecimal): Checks whether the given value is a Decimal color code.

- [**`isRgb()`**](#isrgb): Checks whether the given value is an RGB color code.

- [**`isHex()`**](#isHex): Checks whether the given value is a Hexadecimal color code.

- [**`isHsl()`**](#isHsl): Checks whether the given value is an HSL color code.

- [**`convertToHex()`**](#converttohex): Converts a [decimal](#decimal) or [RGB](#rgb) color code to a [hexadecimal](#hexadecimal) color code.

- [**`convertToRgb()`**](#converttorgb): Converts a [hexadecimal](#hexadecimal) or [decimal](#decimal) color code to an [RGB](#rgb) color code.

- [**`convertToDecimal()`**](#converttodecimal): Converts a [hexadecimal](#hexadecimal) or [RGB](#rgb) color code to a [decimal](#decimal) color code.

- [**`randomNumber()`**](#randomnumber): Generates a random number between the given min and max.

- [**`links()`**](#links): Returns the links of the given string.

- [**`randomItem()`**](#randomitem): Returns a random item from the given array.

- [**`toMilliseconds()`**](#tomilliseconds): Converts any [time unit](#timeunit) to milliseconds.

- [**`check()`**](#check): Checks whether the given value is `true` or `false`. If the value is `true`, returns the first parameter, otherwise returns the second parameter.

- [**`shuffle()`**](#shuffle): Shuffles the given array.

- [**`chunk()`**](#chunk): Turns the given array into groups of the given size.

- [**`factorial()`**](#factorial): Returns the factorial of the given number.

- [**`binomialCoefficient()`**](#binomialcoefficient): Returns the binomial coefficient of the given numbers.

- [**`binomialDistributionProbability()`**](#binomialdistributionprobability): Returns the probability of the binomial distribution.

- [**`colorBrightness()`**](#colorbrightness): Returns the brightness of the given color.

- [**`isLightColor()`**](#islightcolor): Checks whether the given color is a light color.

- [**`lightenHslColor()`**](#lightenhslcolor): Makes the given HSL color lighter.

- [**`darkenHslColor()`**](#darkenhslcolor): Makes the given HSL color darker.

- [**`lightenColor()`**](#lightencolor): Makes the given color lighter.

- [**`darkenColor()`**](#darkencolor): Makes the given color darker.

### `isDecimal()`

`isDecimal(value: any): boolean`

Checks whether the given value is a Decimal color code.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `value` | `any` | The value to check. | ✅ | - |

**Returns:** `boolean`

#### Example

```ts
import { isDecimal } from '@tolga1452/toolbox.js';

isDecimal(3159888); // true
isDecimal("#4C8DFF"); // false
```

### `isRgb()`

`isRgb(value: any): boolean`

Checks whether the given value is a RGB color code.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `value` | `any` | The value to check. | ✅ | - |

**Returns:** `boolean`

#### Example

```ts
import { isRgb } from '@tolga1452/toolbox.js';

isRgb([155, 119, 75]); // true
isRgb("#9B774B"); // false
```

### `isHex()`

`isHex(value: any): boolean`

Checks whether the given value is a Hexadecimal color code.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `value` | `any` | The value to check. | ✅ | - |

**Returns:** `boolean`

#### Example

```ts
import { isHex } from '@tolga1452/toolbox.js';

isHex("#9B774B"); // true
isHex(3159888); // false
```

### `isHsl()`

`isHsl(value: any): boolean`

Checks whether the given value is a HSL color code.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `value` | `any` | The value to check. | ✅ | - |

**Returns:** `boolean`

#### Example

```ts
import { isHsl } from '@tolga1452/toolbox.js';

isHsl([30, 100, 50]); // true
isHsl("#9B774B"); // false
```

### `convertToHex()`

`convertToHex(color: Color | Hsl, fromHsl: boolean = false): Hexadecimal`

Converts the given color code to a Hexadecimal color code.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `color` | [`Color`](#color) \| [`Hsl`](#hsl) | The color code to convert. | ✅ | - |
| `fromHsl` | `boolean` | Whether the color code is a HSL color code. | ❌ | `false` |

**Returns:** [`Hexadecimal`](#hexadecimal)

#### Example

```ts
import { convertToHex } from '@tolga1452/toolbox.js';

convertToHex(4528206); // "#45184e"
convertToHex([69, 24, 78]); // "#45184e"
convertToHex([290, 53, 20], true); // "#45184e"
```

### `convertToRgb()`

`convertToRgb(color: Color | Hsl, fromHsl: boolean = false): Rgb`

Converts the given color code to an RGB color code.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `color` | [`Color`](#color) \| [`Hsl`](#hsl) | The color code to convert. | ✅ | - |
| `fromHsl` | `boolean` | Whether the color code is a HSL color code. | ❌ | `false` |

**Returns:** [`Rgb`](#rgb)

#### Example

```ts
import { convertToRgb } from '@tolga1452/toolbox.js';

convertToRgb(7313317); // [111, 151, 165]
convertToRgb("#6F97A5"); // [111, 151, 165]
convertToRgb([196, 23, 54], true); // [111, 151, 165]
```

### `convertToDecimal()`

`convertToDecimal(color: Color | Hsl, fromHsl: boolean = false): Decimal`

Converts the given color code to an Decimal color code.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `color` | [`Color`](#color) \| [`Hsl`](#hsl) | The color code to convert. | ✅ | - |
| `fromHsl` | `boolean` | Whether the color code is a HSL color code. | ❌ | `false` |

**Returns:** [`Decimal`](#decimal)

#### Example

```ts
import { convertToDecimal } from '@tolga1452/toolbox.js';

convertToDecimal([227, 84, 117]); // 14898293
convertToDecimal("#e35475"); // 14898293
convertToDecimal([346, 72, 61], true); // 14898293
```

### `convertToHsl()`

`convertToHsl(color: Color): Hsl`

Converts the given color code to an HSL color code.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `color` | [`Color`](#color) | The color code to convert. | ✅ | - |

**Returns:** [`Hsl`](#hsl)

#### Example

```ts
import { convertToHsl } from '@tolga1452/toolbox.js';

convertToHsl(3444029); // [126, 46, 38]
convertToHsl("#348d3d"); // [126, 46, 38]
convertToHsl([52, 141, 61]); // [126, 46, 38]
```

### `randomNumber()`

`randomNumber(min: number, max: number): number`

Generates a random number between the given min and max.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `min` | `number` | The minimum number. | ✅ | - |
| `max` | `number` | The maximum number. | ✅ | - |

**Returns:** `number`

#### Example

```ts
import { randomNumber } from '@tolga1452/toolbox.js';

randomNumber(0, 10); // 5
```

### `links()`

`links(str: string): string[]`

Returns the links of the given string.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `str` | `string` | The string to get the links from. | ✅ | - |

**Returns:** `string[]`

#### Example

```ts
import { links } from '@tolga1452/toolbox.js';

links("Check out my website: https://www.example.com"); // ["https://www.example.com"]
```

### `randomItem()`

`randomItem(arr: any[]): any`

Returns a random item from the given array.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `arr` | `any[]` | The array to get the item from. | ✅ | - |

**Returns:** `any`

#### Example

```ts
import { randomItem } from '@tolga1452/toolbox.js';

randomItem(["red", "green", "blue"]); // "red"
```

### `toMilliseconds()`

`toMilliseconds(time: number, unit: TimeUnit): number`

Converts any time unit to milliseconds.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `time` | `number` | The time to convert. | ✅ | - |
| `unit` | [`TimeUnit`](#timeunit) | The unit of the time. | ✅ | - |

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

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `value` | `any` | The value to check. | ✅ | - |
| `ifTrue` | `any` | The value to return if the value is `true`. | ✅ | - |
| `ifFalse` | `any` | The value to return if the value is `false`. | ✅ | - |

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

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `arr` | `any[]` | The array to shuffle. | ✅ | - |

**Returns:** `any[]`

#### Example

```ts
import { shuffle } from '@tolga1452/toolbox.js';

shuffle(["red", "green", "blue"]); // ["blue", "red", "green"]
```

### `chunk()`

`chunk(arr: any[], size: number): any[][]`

Turns the given array into groups of the given size.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `arr` | `any[]` | The array to chunk. | ✅ | - |
| `size` | `number` | The size of the chunks. | ✅ | - |

**Returns:** `any[][]`

#### Example

```ts
import { chunk } from '@tolga1452/toolbox.js';

chunk(["red", "green", "blue", "yellow", "orange"], 2); // [["red", "green"], ["blue", "yellow"], ["orange"]]
```

### `factorial()`

`factorial(n: number): number`

Returns the factorial of the given number.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `n` | `number` | The number to get the factorial of. | ✅ | - |

**Returns:** `number`

#### Example

```ts
import { factorial } from '@tolga1452/toolbox.js';

factorial(5); // 120
```

### `binomialCoefficient()`

`binomialCoefficient(n: number, k: number): number`

Returns the binomial coefficient of the given numbers.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `n` | `number` | The first number. | ✅ | - |
| `k` | `number` | The second number. | ✅ | - |

**Returns:** `number`

#### Example

```ts
import { binomialCoefficient } from '@tolga1452/toolbox.js';

binomialCoefficient(5, 2); // 10
```

### `binomialDistributionProbability()`

`binomialDistributionProbability(successes: number, trials: number, probability: number): number`

Returns the probability of the binomial distribution.

Suppose a biased coin comes up heads with probability 0.3 when tossed. The probability of seeing exactly 4 heads in 6 tosses is `binomialDistributionProbability(4, 6, 0.3)`.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `successes` | `number` | The number of successes. | ✅ | - |
| `trials` | `number` | The number of trials. | ✅ | - |
| `probability` | `number` | The probability of success. The value must be between `0` and `1`. | ✅ | - |

**Returns:** `number`

#### Example

```ts
import { binomialDistributionProbability } from '@tolga1452/toolbox.js';

binomialDistributionProbability(4, 6, 0.3); // 0.05953499999999999
```

### `colorBrightness()`

`colorBrightness(color: Color | Hsl, fromHsl: boolean = false): number`

Returns the brightness of the given color.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `color` | [`Color`](#color) \| [`Hsl`](#hsl) | The color to get the brightness of. | ✅ | - |
| `fromHsl` | `boolean` | Whether the color is a HSL color code. | ❌ | `false` |

**Returns:** `number` between `0` and `255`

#### Example

```ts
import { colorBrightness } from '@tolga1452/toolbox.js';

colorBrightness(6750105); // 197.625
colorBrightness("#66ff99"); // 197.625
colorBrightness([102, 255, 153]); // 197.625
colorBrightness([140, 100, 70], true); // 197.625
```

### `isLightColor()`

`isLightColor(color: Color | Hsl, fromHsl: boolean = false): boolean`

Checks whether the given color is a light color.

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `color` | [`Color`](#color) \| [`Hsl`](#hsl) | The color to get the brightness of. | ✅ | - |
| `fromHsl` | `boolean` | Whether the color is a HSL color code. | ❌ | `false` |

**Returns:** `boolean`

#### Example

```ts
import { isLightColor } from '@tolga1452/toolbox.js';

isLightColor(6750105); // true
isLightColor("#66ff99"); // true
isLightColor([102, 255, 153]); // true
isLightColor([140, 100, 70], true); // true
```

### `lightenHslColor()`

`lightenHslColor(color: Hsl, amount: number = 25): Hsl`

Makes the given HSL color lighter. This function is HSL only. For other color types, use [`lightenColor`](#lightencolor).

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `color` | [`Hsl`](#hsl) | The HSL color to lighten. | ✅ | - |
| `amount` | `number` | The amount to lighten the color by. The value must be between `0` and `100`. | ❌ | `25` |

**Returns:** [`Hsl`](#hsl)

#### Example

```ts
import { lightenHslColor } from '@tolga1452/toolbox.js';

lightenHslColor([30, 100, 50]); // [30, 100, 80]
lightenHslColor([30, 100, 50], 50); // [30, 100, 100]
```

### `darkenHslColor()`

`darkenHslColor(color: Hsl, amount: number = 25): Hsl`

Makes the given HSL color darker. This function is HSL only. For other color types, use [`darkenColor`](#darkencolor).

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `color` | [`Hsl`](#hsl) | The HSL color to darken. | ✅ | - |
| `amount` | `number` | The amount to darken the color by. The value must be between `0` and `100`. | ❌ | `25` |

**Returns:** [`Hsl`](#hsl)

#### Example

```ts
import { darkenHslColor } from '@tolga1452/toolbox.js';

darkenHslColor([30, 100, 50]); // [30, 100, 20]
darkenHslColor([30, 100, 50], 50); // [30, 100, 0]
```

### `lightenColor()`

`lightenColor(color: Color, amount: number = 25): typeof color`

Makes the given color lighter. For HSL colors, use [`lightenHslColor`](#lightenhslcolor).

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `color` | [`Color`](#color) | The color to lighten. | ✅ | - |
| `amount` | `number` | The amount to lighten the color by. The value must be between `0` and `100`. | ❌ | `25` |

**Returns:** `typeof color`

#### Example

```ts
import { lightenColor } from '@tolga1452/toolbox.js';

lightenColor(39219); // 1769318
lightenColor("#009933"); // "#1aff66"
lightenColor("#009933", 50); // "#99ffbb"
lightenColor([0, 153, 51]); // [26, 255, 102]
```

### `darkenColor()`

`darkenColor(color: Color, amount: number = 25): typeof color`

Makes the given color darker. For HSL colors, use [`darkenHslColor`](#darkenhslcolor).

| Parameter | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `color` | [`Color`](#color) | The color to darken. | ✅ | - |
| `amount` | `number` | The amount to darken the color by. The value must be between `0` and `100`. | ❌ | `25` |

**Returns:** `typeof color`

#### Example

```ts
import { darkenColor } from '@tolga1452/toolbox.js';

darkenColor(6750105); // 58957
darkenColor("#66ff99"); // "#00e64d"
darkenColor("#66ff99", 50); // "#006622"
darkenColor([102, 255, 153]); // [140, 100, 45]
```

## Types

### `Decimal`

A Decimal color code is a number between 0 and 16777215 (0xFFFFFF).

```ts
export type Decimal = number;
```

### `Rgb`

An RGB color code is an array of 3 numbers between 0 and 255.

```ts
export type Rgb = [number, number, number];
```

### `Hexadecimal`

A Hexadecimal color code is a string that starts with a '#' and is followed by 6 hexadecimal characters.

```ts
export type Hexadecimal = `#${string}`;
```

### `Hsl`

An HSL color code is an array of 3 numbers. The first number is the hue, the second number is the saturation, and the third number is the lightness.

```ts
export type Hsl = [number, number, number];
```

### `Color`

A color code can be a Decimal, RGB, or Hexadecimal color code.

```ts
export type Hsl = Decimal | Rgb | Hexadecimal;
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
