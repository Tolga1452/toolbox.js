"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binomialDistributionProbability = exports.binomialCoefficient = exports.factorial = exports.chunk = exports.shuffle = exports.check = exports.toMilliseconds = exports.randomItem = exports.links = exports.randomNumber = exports.convertToDecimal = exports.convertToRGB = exports.convertToHex = exports.TimeUnit = void 0;
/**
 * The time units.
 */
var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["Milliseconds"] = 0] = "Milliseconds";
    TimeUnit[TimeUnit["Seconds"] = 1] = "Seconds";
    TimeUnit[TimeUnit["Minutes"] = 2] = "Minutes";
    TimeUnit[TimeUnit["Hours"] = 3] = "Hours";
    TimeUnit[TimeUnit["Days"] = 4] = "Days";
    TimeUnit[TimeUnit["Weeks"] = 5] = "Weeks";
    TimeUnit[TimeUnit["Months"] = 6] = "Months";
    TimeUnit[TimeUnit["Years"] = 7] = "Years";
})(TimeUnit = exports.TimeUnit || (exports.TimeUnit = {}));
;
/**
 * Converts a decimal or RGB color code to a hexadecimal color code.
 * @param color The color code to convert.
 * @returns The converted color code.
 * @example
 * convertToHex(0x000000); // #000000
 * convertToHex([0, 0, 0]); // #000000
 */
function convertToHex(color) {
    if (typeof color === 'number')
        return `#${color.toString(16).padStart(6, '0')}`;
    else
        return `#${color.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}
exports.convertToHex = convertToHex;
;
/**
 * Converts a hexadecimal or decimal color code to an RGB color code.
 * @param color The color code to convert.
 * @returns The converted color code.
 * @example
 * convertToRGB(0x000000); // [0, 0, 0]
 * convertToRGB('#000000'); // [0, 0, 0]
 */
function convertToRGB(color) {
    if (typeof color === 'number')
        return [
            (color & 0xFF0000) >> 16,
            (color & 0x00FF00) >> 8,
            color & 0x0000FF
        ];
    else
        return [
            parseInt(color.slice(1, 3), 16),
            parseInt(color.slice(3, 5), 16),
            parseInt(color.slice(5, 7), 16)
        ];
}
exports.convertToRGB = convertToRGB;
;
/**
 * Converts a hexadecimal or RGB color code to a decimal color code.
 * @param color The color code to convert.
 * @returns The converted color code.
 * @example
 * convertToDecimal([0, 0, 0]); // 0
 * convertToDecimal('#000000'); // 0
 */
function convertToDecimal(color) {
    if (typeof color === 'string')
        return parseInt(color.slice(1), 16);
    else
        return (color[0] << 16) + (color[1] << 8) + color[2];
}
exports.convertToDecimal = convertToDecimal;
;
/**
 * Generates a random number between the given min and max.
 * @param min The minimum number.
 * @param max The maximum number.
 * @returns The generated number.
 * @example
 * randomNumber(0, 10); // 5
 */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randomNumber = randomNumber;
;
/**
 * Returns the links of the given string.
 * @param str The string to get the links from.
 * @returns The links.
 * @example
 * links("Check out my website: https://www.example.com"); // ["https://www.example.com"]
 */
function links(str) {
    const regex = /https?:\/\/[^\s]+[^\s.,;:!?)]/g;
    return str.match(regex) || [];
}
exports.links = links;
;
/**
 * Returns a random item from the given array.
 * @param arr The array to get the item from.
 * @returns The item.
 * @example
 * randomItem(["red", "green", "blue"]); // "red"
 */
function randomItem(arr) {
    return arr[randomNumber(0, arr.length - 1)];
}
exports.randomItem = randomItem;
;
/**
 * Converts any time unit to milliseconds.
 * @param time The time to convert.
 * @param unit The unit of the time.
 * @returns The converted time.
 * @example
 * toMilliseconds(1, TimeUnit.Seconds); // 1000
 */
function toMilliseconds(time, unit) {
    switch (unit) {
        case TimeUnit.Milliseconds:
            return time;
        case TimeUnit.Seconds:
            return time * 1000;
        case TimeUnit.Minutes:
            return time * 60000;
        case TimeUnit.Hours:
            return time * 3600000;
        case TimeUnit.Days:
            return time * 86400000;
        case TimeUnit.Weeks:
            return time * 604800000;
        case TimeUnit.Months:
            return time * 2629800000;
        case TimeUnit.Years:
            return time * 31557600000;
    }
    ;
}
exports.toMilliseconds = toMilliseconds;
;
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
function check(value, ifTrue, ifFalse) {
    return value ? ifTrue : ifFalse;
}
exports.check = check;
;
/**
 * Shuffles the given array.
 * @param arr The array to shuffle.
 * @returns The shuffled array.
 * @example
 * shuffle(["red", "green", "blue"]); // ["blue", "red", "green"]
 */
function shuffle(arr) {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    ;
    return newArr;
}
exports.shuffle = shuffle;
;
/**
 * Turns the given array into groups of the given size.
 * @param arr The array to chunk.
 * @param size The size of the chunks.
 * @returns The chunked array.
 * @example
 * chunk(["red", "green", "blue", "yellow", "orange"], 2); // [["red", "green"], ["blue", "yellow"], ["orange"]]
 */
function chunk(arr, size) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
    }
    ;
    return newArr;
}
exports.chunk = chunk;
;
/**
 * Returns the factorial of the given number.
 * @param n The number to get the factorial of.
 * @returns The factorial.
 */
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    ;
    return result;
}
exports.factorial = factorial;
;
/**
 * Returns the binomial coefficient of the given numbers.
 * @param n The first number.
 * @param k The second number.
 * @returns The binomial coefficient.
 */
function binomialCoefficient(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}
exports.binomialCoefficient = binomialCoefficient;
;
/**
 * Returns the probability of the binomial distribution.
 *
 * Suppose a biased coin comes up heads with probability 0.3 when tossed. The probability of seeing exactly 4 heads in 6 tosses is `binomialDistributionProbability(4, 6, 0.3)`.
 * @param successes The number of successes.
 * @param trials The number of trials.
 * @param probability The probability of success.
 * @returns The probability.
 */
function binomialDistributionProbability(successes, trials, probability) {
    if (successes < 0)
        throw new Error('Successes cannot be less than 0.');
    if (trials < 0)
        throw new Error('Trials cannot be less than 0.');
    if (successes > trials)
        throw new Error('Successes cannot be greater than trials.');
    if (probability < 0 || probability > 1)
        throw new Error('Probability must be between 0 and 1. If you want to convert a percentage to a decimal, divide it by 100 and multiply the result by 100.');
    return binomialCoefficient(trials, successes) * (probability ** successes) * ((1 - probability) ** (trials - successes));
}
exports.binomialDistributionProbability = binomialDistributionProbability;
;
//# sourceMappingURL=index.js.map