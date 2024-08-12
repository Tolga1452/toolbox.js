/**
 * A Decimal color code is a number between 0 and 16777215 (0xFFFFFF).
 */
export type Decimal = number;
/**
 * An RGB color code is an array of 3 numbers between 0 and 255.
 */
export type Rgb = [number, number, number];
/**
 * A Hexadecimal color code is a string that starts with a '#' and is followed by 6 hexadecimal characters.
 */
export type Hexadecimal = `#${string}`;
/**
 * An HSL color code is an array of 3 numbers. The first number is the hue, the second number is the saturation, and the third number is the lightness.
 */
export type Hsl = [number, number, number];
/**
 * A color code can be a Decimal, RGB, or Hexadecimal color code.
 */
export type Color = Decimal | Rgb | Hexadecimal;
/**
 * The time units.
 */
export declare enum TimeUnit {
    Milliseconds = 0,
    Seconds = 1,
    Minutes = 2,
    Hours = 3,
    Days = 4,
    Weeks = 5,
    Months = 6,
    Years = 7
}
/**
 * Checks whether the given value is a Decimal color code.
 * @param value The value to check.
 * @returns Whether the value is a Decimal color code.
 * @example
 * isDecimal(3159888); // true
 * isDecimal("#4C8DFF"); // false
 */
export declare function isDecimal(value: any): value is Decimal;
/**
 * Checks whether the given value is an RGB color code.
 * @param value The value to check.
 * @returns Whether the value is an RGB color code.
 * @example
 * isRgb([155, 119, 75]); // true
 * isRgb("#9B774B"); // false
 */
export declare function isRgb(value: any): value is Rgb;
/**
 * Checks whether the given value is a Hexadecimal color code.
 * @param value The value to check.
 * @returns Whether the value is a Hexadecimal color code.
 * @example
 * isHex("#9B774B"); // true
 * isHex(3159888); // false
 */
export declare function isHex(value: any): value is Hexadecimal;
/**
 * Checks whether the given value is an HSL color code.
 * @param value The value to check.
 * @returns Whether the value is an HSL color code.
 * @example
 * isHsl([30, 100, 50]); // true
 * isHsl("#9B774B"); // false
 */
export declare function isHsl(value: any): value is Hsl;
/**
 * Converts the given color code to a Hexadecimal color code.
 * @param color The color code to convert.
 * @param fromHsl Whether the color code is a HSL color code.
 * @returns The converted color code.
 * @example
 * convertToHex(4528206); // "#45184e"
 * convertToHex([69, 24, 78]); // "#45184e"
 * convertToHex([290, 53, 20], true); // "#45184e"
 */
export declare function convertToHex(color: Color | Hsl, fromHsl?: boolean): Hexadecimal;
/**
 * Converts the given color code to an RGB color code.
 * @param color The color code to convert.
 * @param fromHsl Whether the color code is a HSL color code.
 * @returns The converted color code.
 * @example
 * convertToRgb(7313317); // [111, 151, 165]
 * convertToRgb("#6F97A5"); // [111, 151, 165]
 * convertToRgb([196, 23, 54], true); // [111, 151, 165]
 */
export declare function convertToRgb(color: Color | Hsl, fromHsl?: boolean): Rgb;
/**
 * Converts the given color code to a Decimal color code.
 * @param color The color code to convert.
 * @param fromHsl Whether the color code is a HSL color code.
 * @returns The converted color code.
 * @example
 * convertToDecimal([227, 84, 117]); // 14898293
 * convertToDecimal("#e35475"); // 14898293
 * convertToDecimal([346, 72, 61], true); // 14898293
 */
export declare function convertToDecimal(color: Color | Hsl, fromHsl?: boolean): Decimal;
/**
 * Converts the given color code to an HSL color code.
 * @param color The color code to convert.
 * @returns The converted color code.
 * @example
 * convertToHsl(3444029); // [126, 46, 38]
 * convertToHsl("#348d3d"); // [126, 46, 38]
 * convertToHsl([52, 141, 61]); // [126, 46, 38]
 */
export declare function convertToHsl(color: Color): Hsl;
/**
 * Generates a random number between the given min and max.
 * @param min The minimum number.
 * @param max The maximum number.
 * @returns The generated number.
 * @example
 * randomNumber(0, 10); // 5
 */
export declare function randomNumber(min: number, max: number): number;
/**
 * Returns the links of the given string.
 * @param str The string to get the links from.
 * @returns The links.
 * @example
 * links("Check out my website: https://www.example.com"); // ["https://www.example.com"]
 */
export declare function links(str: string): string[];
/**
 * Returns a random item from the given array.
 * @param arr The array to get the item from.
 * @returns The item.
 * @example
 * randomItem(["red", "green", "blue"]); // "red"
 */
export declare function randomItem(arr: any[]): any;
/**
 * Converts any time unit to milliseconds.
 * @param time The time to convert.
 * @param unit The unit of the time.
 * @returns The converted time.
 * @example
 * toMilliseconds(1, TimeUnit.Seconds); // 1000
 */
export declare function toMilliseconds(time: number, unit: TimeUnit): number;
/**
 * Checks whether the given value is `true` or `false`. If the value is `true`, returns the first parameter, otherwise returns the second parameter.
 *
 * **Note:** You don't have to give a boolean to `value`. For example `"text"` is returns `true` and `""` is returns `false`, or `1` is returns `true` and `0` is returns `false`.
 * @param value The value to check.
 * @param ifTrue The value to return if the value is `true`.
 * @param ifFalse The value to return if the value is `false`.
 * @returns The value.
 * @example
 * check(true, "Hello", "World"); // "Hello"
 * check(false, "Hello", "World"); // "World"
 * check("text", "Hello", "World"); // "Hello"
 * check("", "Hello", "World"); // "World"
 */
export declare function check(value: any, ifTrue: any, ifFalse: any): any;
/**
 * Shuffles the given array.
 * @param arr The array to shuffle.
 * @returns The shuffled array.
 * @example
 * shuffle(["red", "green", "blue"]); // ["blue", "red", "green"]
 */
export declare function shuffle(arr: any[]): any[];
/**
 * Turns the given array into groups of the given size.
 * @param arr The array to chunk.
 * @param size The size of the chunks.
 * @returns The chunked array.
 * @example
 * chunk(["red", "green", "blue", "yellow", "orange"], 2); // [["red", "green"], ["blue", "yellow"], ["orange"]]
 */
export declare function chunk(arr: any[], size: number): any[][];
/**
 * Returns the factorial of the given number.
 * @param n The number to get the factorial of.
 * @returns The factorial.
 * @example
 * factorial(5); // 120
 */
export declare function factorial(n: number): number;
/**
 * Returns the binomial coefficient of the given numbers.
 * @param n The first number.
 * @param k The second number.
 * @returns The binomial coefficient.
 * @example
 * binomialCoefficient(5, 2); // 10
 */
export declare function binomialCoefficient(n: number, k: number): number;
/**
 * Returns the probability of the binomial distribution.
 *
 * Suppose a biased coin comes up heads with probability 0.3 when tossed. The probability of seeing exactly 4 heads in 6 tosses is `binomialDistributionProbability(4, 6, 0.3)`.
 * @param successes The number of successes.
 * @param trials The number of trials.
 * @param probability The probability of success. The value must be between `0` and `1`.
 * @returns The probability.
 * @example
 * binomialDistributionProbability(4, 6, 0.3); // 0.05953499999999999
 */
export declare function binomialDistributionProbability(successes: number, trials: number, probability: number): number;
/**
 * Returns the brightness of the given color.
 * @param color The color to get the brightness of.
 * @param fromHsl Whether the color is a HSL color code.
 * @returns The brightness. The value is between 0 and 255.
 * @example
 * colorBrightness(6750105); // 197.625
 * colorBrightness("#66ff99"); // 197.625
 * colorBrightness([102, 255, 153]); // 197.625
 * colorBrightness([140, 100, 70], true); // 197.625
 */
export declare function colorBrightness(color: Color | Hsl, fromHsl?: boolean): number;
/**
 * Checks whether the given color is a light color.
 * @param color The color to check.
 * @param fromHsl Whether the color is a HSL color code.
 * @returns Whether the color is a light color.
 * @example
 * isLightColor(6750105); // true
 * isLightColor("#66ff99"); // true
 * isLightColor([102, 255, 153]); // true
 * isLightColor([140, 100, 70], true); // true
 */
export declare function isLightColor(color: Color | Hsl, fromHsl?: boolean): boolean;
/**
 * Makes the given HSL color lighter. This function is HSL only. For other color types, use `lightenColor`.
 * @param color The HSL color to lighten.
 * @param amount The amount to lighten the color by. The value must be between `0` and `100`. The default value is `30`.
 * @returns The lightened HSL color.
 * @example
 * lightenHslColor([30, 100, 50]); // [30, 100, 80]
 * lightenHslColor([30, 100, 50], 50); // [30, 100, 100]
 */
export declare function lightenHslColor(color: Hsl, amount?: number): Hsl;
/**
 * Makes the given HSL color darker. This function is HSL only. For other color types, use `darkenColor`.
 * @param color The HSL color to darken.
 * @param amount The amount to darken the color by. The value must be between `0` and `100`. The default value is `25`.
 * @returns The darkened HSL color.
 * @example
 * darkenHslColor([30, 100, 50]); // [30, 100, 20]
 * darkenHslColor([30, 100, 50], 50); // [30, 100, 0]
 */
export declare function darkenHslColor(color: Hsl, amount?: number): Hsl;
/**
 * Makes the given color lighter. For HSL colors, use `lightenHslColor`.
 * @param color The color to lighten.
 * @param amount The amount to lighten the color by. The value must be between `0` and `100`. The default value is `25`.
 * @returns The lightened color.
 * @example
 * lightenColor(39219); // 1769318
 * lightenColor("#009933"); // "#1aff66"
 * lightenColor("#009933", 50); // "#99ffbb"
 * lightenColor([0, 153, 51]); // [26, 255, 102]
 */
export declare function lightenColor(color: Color, amount?: number): typeof color;
/**
 * Makes the given color darker. For HSL colors, use `darkerHslColor`.
 * @param color The color to darken.
 * @param amount The amount to darken the color by. The value must be between `0` and `100`. The default value is `25`.
 * @returns The darkened color.
 * @example
 * darkenColor(6750105); // 58957
 * darkenColor("#66ff99"); // "#00e64d"
 * darkenColor("#66ff99", 50); // "#006622"
 * darkenColor([102, 255, 153]); // [140, 100, 45]
 */
export declare function darkenColor(color: Color, amount?: number): typeof color;
