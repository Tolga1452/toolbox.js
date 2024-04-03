/**
 * A Decimal color code is a number between 0 and 16777215 (0xFFFFFF).
 */
export type Decimal = number;
/**
 * An RGB color code is an array of 3 numbers between 0 and 255.
 */
export type RGB = [number, number, number];
/**
 * A Hexadecimal color code is a string that starts with a '#' and is followed by 6 hexadecimal characters.
 */
export type Hexadecimal = `#${string}`;
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
 * Converts a decimal or RGB color code to a hexadecimal color code.
 * @param color The color code to convert.
 * @returns The converted color code.
 * @example
 * convertToHex(0x000000); // #000000
 * convertToHex([0, 0, 0]); // #000000
 */
export declare function convertToHex(color: Decimal | RGB): Hexadecimal;
/**
 * Converts a hexadecimal or decimal color code to an RGB color code.
 * @param color The color code to convert.
 * @returns The converted color code.
 * @example
 * convertToRGB(0x000000); // [0, 0, 0]
 * convertToRGB('#000000'); // [0, 0, 0]
 */
export declare function convertToRGB(color: Hexadecimal | Decimal): RGB;
/**
 * Converts a hexadecimal or RGB color code to a decimal color code.
 * @param color The color code to convert.
 * @returns The converted color code.
 * @example
 * convertToDecimal([0, 0, 0]); // 0
 * convertToDecimal('#000000'); // 0
 */
export declare function convertToDecimal(color: Hexadecimal | RGB): Decimal;
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
 */
export declare function factorial(n: number): number;
/**
 * Returns the binomial coefficient of the given numbers.
 * @param n The first number.
 * @param k The second number.
 * @returns The binomial coefficient.
 */
export declare function binomialCoefficient(n: number, k: number): number;
/**
 * Returns the probability of the binomial distribution.
 *
 * Suppose a biased coin comes up heads with probability 0.3 when tossed. The probability of seeing exactly 4 heads in 6 tosses is `binomialDistributionProbability(4, 6, 0.3)`.
 * @param successes The number of successes.
 * @param trials The number of trials.
 * @param probability The probability of success.
 * @returns The probability.
 */
export declare function binomialDistributionProbability(successes: number, trials: number, probability: number): number;
