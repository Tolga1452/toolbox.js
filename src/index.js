"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkenColor = exports.lightenColor = exports.darkenHslColor = exports.lightenHslColor = exports.isLightColor = exports.colorBrightness = exports.binomialDistributionProbability = exports.binomialCoefficient = exports.factorial = exports.chunk = exports.shuffle = exports.check = exports.toMilliseconds = exports.randomItem = exports.links = exports.randomNumber = exports.convertToHsl = exports.convertToDecimal = exports.convertToRgb = exports.convertToHex = exports.isHsl = exports.isHex = exports.isRgb = exports.isDecimal = exports.TimeUnit = void 0;
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
 * Checks whether the given value is a Decimal color code.
 * @param value The value to check.
 * @returns Whether the value is a Decimal color code.
 * @example
 * isDecimal(3159888); // true
 * isDecimal("#4C8DFF"); // false
 */
function isDecimal(value) {
    return typeof value === 'number' && value >= 0 && value <= 0xFFFFFF;
}
exports.isDecimal = isDecimal;
;
/**
 * Checks whether the given value is an RGB color code.
 * @param value The value to check.
 * @returns Whether the value is an RGB color code.
 * @example
 * isRgb([155, 119, 75]); // true
 * isRgb("#9B774B"); // false
 */
function isRgb(value) {
    return Array.isArray(value) && value.length === 3 && value.every(v => typeof v === 'number' && v >= 0 && v <= 255);
}
exports.isRgb = isRgb;
;
/**
 * Checks whether the given value is a Hexadecimal color code.
 * @param value The value to check.
 * @returns Whether the value is a Hexadecimal color code.
 * @example
 * isHex("#9B774B"); // true
 * isHex(3159888); // false
 */
function isHex(value) {
    return typeof value === 'string' && /^#?([0-9A-Fa-f]{3}){1,2}$/.test(value);
}
exports.isHex = isHex;
;
/**
 * Checks whether the given value is an HSL color code.
 * @param value The value to check.
 * @returns Whether the value is an HSL color code.
 * @example
 * isHsl([30, 100, 50]); // true
 * isHsl("#9B774B"); // false
 */
function isHsl(value) {
    return Array.isArray(value) && value.length === 3 && value.every((v, i) => typeof v === 'number' && (i === 0 ? v >= 0 && v <= 360 : v >= 0 && v <= 100));
}
exports.isHsl = isHsl;
;
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
function convertToHex(color, fromHsl = false) {
    if (fromHsl)
        return convertToHex(convertToRgb(color, true));
    else {
        if (isHex(color))
            return color;
        else if (isDecimal(color))
            return `#${color.toString(16).padStart(6, '0')}`;
        else if (isRgb(color))
            return `#${color.map(c => c.toString(16).padStart(2, '0')).join('')}`;
        else
            throw new Error('Invalid color code.');
    }
    ;
}
exports.convertToHex = convertToHex;
;
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
function convertToRgb(color, fromHsl = false) {
    if (fromHsl) {
        if (!isHsl(color))
            throw new Error('Color is not a HSL color code.');
        const h = Math.max(0, Math.min(360, color[0]));
        const s = Math.max(0, Math.min(100, color[1])) / 100;
        const l = Math.max(0, Math.min(100, color[2])) / 100;
        if (s === 0) {
            const gray = Math.round(l * 255);
            return [gray, gray, gray];
        }
        ;
        function hue2rgb(p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        ;
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        const r = hue2rgb(p, q, h / 360 + 1 / 3);
        const g = hue2rgb(p, q, h / 360);
        const b = hue2rgb(p, q, h / 360 - 1 / 3);
        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }
    else {
        if (isRgb(color))
            return color;
        else if (isDecimal(color))
            return [
                (color & 0xFF0000) >> 16,
                (color & 0x00FF00) >> 8,
                color & 0x0000FF
            ];
        else if (isHex(color))
            return [
                parseInt(color.slice(1, 3), 16),
                parseInt(color.slice(3, 5), 16),
                parseInt(color.slice(5, 7), 16)
            ];
        else
            throw new Error('Invalid color code.');
    }
    ;
}
exports.convertToRgb = convertToRgb;
;
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
function convertToDecimal(color, fromHsl = false) {
    if (fromHsl)
        return convertToDecimal(convertToRgb(color, true));
    else {
        if (isDecimal(color))
            return color;
        else if (isHex(color))
            return parseInt(color.slice(1), 16);
        else if (isRgb(color))
            return (color[0] << 16) + (color[1] << 8) + color[2];
        else
            throw new Error('Invalid color code.');
    }
    ;
}
exports.convertToDecimal = convertToDecimal;
;
/**
 * Converts the given color code to an HSL color code.
 * @param color The color code to convert.
 * @returns The converted color code.
 * @example
 * convertToHsl(3444029); // [126, 46, 38]
 * convertToHsl("#348d3d"); // [126, 46, 38]
 * convertToHsl([52, 141, 61]); // [126, 46, 38]
 */
function convertToHsl(color) {
    const [r, g, b] = convertToRgb(color).map(c => c / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    let l = (max + min) / 2;
    if (max === min)
        h = s = 0;
    else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                {
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                }
                ;
            case g:
                {
                    h = (b - r) / d + 2;
                    break;
                }
                ;
            case b:
                {
                    h = (r - g) / d + 4;
                    break;
                }
                ;
        }
        ;
        h /= 6;
    }
    ;
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
exports.convertToHsl = convertToHsl;
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
 * @example
 * factorial(5); // 120
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
 * @example
 * binomialCoefficient(5, 2); // 10
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
 * @param probability The probability of success. The value must be between `0` and `1`.
 * @returns The probability.
 * @example
 * binomialDistributionProbability(4, 6, 0.3); // 0.05953499999999999
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
function colorBrightness(color, fromHsl = false) {
    const [r, g, b] = convertToRgb(color, fromHsl);
    return (r * 299 + g * 587 + b * 114) / 1000;
}
exports.colorBrightness = colorBrightness;
;
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
function isLightColor(color, fromHsl = false) {
    return colorBrightness(color, fromHsl) > 128;
}
exports.isLightColor = isLightColor;
;
/**
 * Makes the given HSL color lighter. This function is HSL only. For other color types, use `lightenColor`.
 * @param color The HSL color to lighten.
 * @param amount The amount to lighten the color by. The value must be between `0` and `100`. The default value is `30`.
 * @returns The lightened HSL color.
 * @example
 * lightenHslColor([30, 100, 50]); // [30, 100, 80]
 * lightenHslColor([30, 100, 50], 50); // [30, 100, 100]
 */
function lightenHslColor(color, amount = 25) {
    let [h, s, l] = color;
    l = Math.min(100, l + amount);
    return [h, s, l];
}
exports.lightenHslColor = lightenHslColor;
;
/**
 * Makes the given HSL color darker. This function is HSL only. For other color types, use `darkenColor`.
 * @param color The HSL color to darken.
 * @param amount The amount to darken the color by. The value must be between `0` and `100`. The default value is `25`.
 * @returns The darkened HSL color.
 * @example
 * darkenHslColor([30, 100, 50]); // [30, 100, 20]
 * darkenHslColor([30, 100, 50], 50); // [30, 100, 0]
 */
function darkenHslColor(color, amount = 25) {
    let [h, s, l] = color;
    l = Math.max(0, l - amount);
    return [h, s, l];
}
exports.darkenHslColor = darkenHslColor;
;
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
function lightenColor(color, amount = 25) {
    const ligthened = lightenHslColor(convertToHsl(color), amount);
    if (isDecimal(color))
        return convertToDecimal(ligthened, true);
    else if (isHex(color))
        return convertToHex(ligthened, true);
    else if (isRgb(color))
        return convertToRgb(ligthened, true);
}
exports.lightenColor = lightenColor;
;
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
function darkenColor(color, amount = 25) {
    const ligthened = darkenHslColor(convertToHsl(color), amount);
    if (isDecimal(color))
        return convertToDecimal(ligthened, true);
    else if (isHex(color))
        return convertToHex(ligthened, true);
    else if (isRgb(color))
        return convertToRgb(ligthened, true);
}
exports.darkenColor = darkenColor;
;
//# sourceMappingURL=index.js.map