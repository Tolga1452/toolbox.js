import { CMYK, Decimal, Hexadecimal, HSL, RGB, RgbByte } from '../types/index.js';
import hueToRgb from '../utils/hueToRgb.js';
import mixComponents from '../utils/mixComponents.js';

/**
 * A comprehensive color class that supports multiple color formats including
 * decimal, hexadecimal, RGB, HSL, and CMYK. Provides methods for color conversion,
 * manipulation (lighten, darken, mix), and utility operations.
 * 
 * @example
 * // Creating colors from different formats
 * const color1 = Color.fromHex('#FF5733');
 * const color2 = Color.fromRgb({ r: 255, g: 87, b: 51 });
 * const color3 = Color.fromHsl({ h: 11, s: 100, l: 60 });
 * const color4 = Color.fromCmyk({ c: 0, m: 66, y: 80, k: 0 });
 * const color5 = Color.fromDecimal(0xFF5733);
 * 
 * @example
 * // Converting between formats
 * const color = Color.fromHex('#FF5733');
 * console.log(color.toHex());     // "#FF5733"
 * console.log(color.toRgb());     // { r: 255, g: 87, b: 51 }
 * console.log(color.toHsl());     // { h: 10.588235294117647, s: 100, l: 60 }
 * console.log(color.toCmyk());    // { c: 0, m: 65.9, y: 80, k: 0 }
 * console.log(color.toDecimal()); // 16729359
 * 
 * @example
 * // Color manipulation
 * const color = Color.fromHex('#FF5733');
 * color.lighten(30);              // Lighten by 30%
 * color.darken(10);               // Darken by 10%
 * 
 * const anotherColor = Color.fromHex('#33FF57');
 * color.mix(anotherColor, 60);    // Mix 60% with another color
 * 
 * @example
 * // Working with alpha channels
 * const colorWithAlpha = Color.fromHex('#FF5733FF');
 * console.log(colorWithAlpha.hasAlphaChannel); // true
 * console.log(colorWithAlpha.toRgb());         // { r: 255, g: 87, b: 51, a: 1 }
 * 
 * @example
 * // Color properties and utilities
 * const color = Color.fromHex('#FF5733');
 * console.log(color.lightness);   // 60
 * console.log(color.isLight);     // true
 * console.log(color.isDark);      // false
 * console.log(color.valueOf());   // 16734003
 * console.log(color.toString());  // "#FF5733"
 * 
 * @example
 * // Cloning and JSON representation
 * const original = Color.fromHex('#FF5733');
 * const cloned = original.clone();
 * console.log(original.toJSON()); // Complete color representation
 * 
 * @example
 * // Custom byte ordering for decimal conversion
 * const color = Color.fromHex('#FF5733FF');
 * const rgbOnly = color.toDecimal([RgbByte.Red, RgbByte.Green, RgbByte.Blue]);
 * console.log(rgbOnly); // 16734003 (without alpha)
 */
export class Color {
    private constructor(private decimal: number, private hasAlpha: boolean = false) { };

    private update(color: Color): void {
        this.decimal = color.decimal;
        this.hasAlpha = color.hasAlpha;
    };

    /**
     * Creates a new Color instance from a decimal color value.
     * 
     * @param decimal The decimal color value.
     * @param hasAlpha Whether the color has an alpha channel. You should set this to `true` if the color is fully transparent because when the alpha byte is `0x00`, the value cannot be added to the decimal value.
     * @returns The Color instance.
     * 
     * @example
     * const color = Color.fromDecimal(0xFF5733);
     */
    public static fromDecimal(decimal: Decimal, hasAlpha: boolean = false): Color {
        if (!Number.isInteger(decimal)) throw new TypeError('`decimal` must be an integer');
        if (decimal < 0 || decimal > 0xFFFFFFFF) throw new RangeError('`decimal` must be between 0 and 4294967295 (0xFFFFFFFF), inclusive');

        return new this(decimal, hasAlpha || (decimal & 0xFF000000) !== 0);
    };

    /**
     * Creates a new Color instance from a hexadecimal color code.
     * 
     * @param hex The hexadecimal color code (e.g. `#FFFFFF`). Must be 4, 5, 7, or 9 characters long.
     * @returns The Color instance.
     * 
     * @example
     * const color = Color.fromHex('#FF5733');
     */
    public static fromHex(hex: Hexadecimal): Color {
        if (typeof hex !== 'string') throw new TypeError('`hex` must be a string');
        if (!/^#(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hex)) throw new SyntaxError('`hex` must be a valid hexadecimal color code (e.g. `#FFFFFF`)');

        let digits = hex.slice(1);

        if (digits.length === 3 || digits.length === 4) {
            const [r, g, b] = digits.split('').map(d => parseInt(d + d, 16)) as [number, number, number];

            let a: number | undefined = digits.split('').length === 4 ? parseInt(digits[3]! + digits[3], 16) : undefined;

            if (a !== undefined) a /= 255;

            return this.fromRgb({ r, g, b, a });
        } else if (digits.length === 6) return this.fromDecimal(parseInt(digits, 16));
        else {
            const a = digits.slice(6, 8);

            digits = `${a}${digits.slice(0, 6)}`;

            return this.fromDecimal(parseInt(digits, 16), true);
        };
    };

    /**
     * Creates a new Color instance from an RGB object.
     * 
     * @param rgb The RGB object.
     * @returns The Color instance.
     * 
     * @example
     * const color = Color.fromRgb({ r: 255, g: 87, b: 51 });
     */
    public static fromRgb(rgb: RGB): Color {
        if (typeof rgb !== 'object') throw new TypeError('`rgb` must be an RGB object');

        const { r, g, b } = rgb;

        let { a } = rgb;

        if (!Number.isInteger(r) || !Number.isInteger(g) || !Number.isInteger(b)) throw new TypeError('`rgb` must have `r`, `g`, and `b` properties that are integers');
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) throw new RangeError('`rgb` must have `r`, `g`, and `b` properties that are between 0 and 255, inclusive');

        let decimal: Decimal;

        if (a !== undefined) {
            if (typeof a !== 'number') throw new TypeError('`a` property of `rgb` must be a number');
            if (a < 0 || a > 1) throw new RangeError('`a` property of `rgb` must be between 0 and 1, inclusive');

            a = Math.round(a * 255);

            decimal = ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
        } else decimal = (r << 16) | (g << 8) | b;

        return this.fromDecimal(decimal, a !== undefined);
    };

    /**
     * Creates a new Color instance from an HSL object.
     * 
     * @param hsl The HSL object.
     * @returns The Color instance.
     * 
     * @example
     * const color = Color.fromHsl({ h: 360, s: 100, l: 50 });
     */
    public static fromHsl(hsl: HSL): Color {
        if (typeof hsl !== 'object') throw new TypeError('`hsl` must be an HSL object');

        let { h, s, l, a } = hsl;

        if (typeof h !== 'number' || typeof s !== 'number' || typeof l !== 'number') throw new TypeError('`hsl` must have `h`, `s`, and `l` properties that are numbers');
        if (h < 0 || h > 360) throw new RangeError('`h` property of `hsl` must be between 0 and 360, inclusive');
        if (s < 0 || s > 100 || l < 0 || l > 100) throw new RangeError('`s` and `l` properties of `hsl` must be between 0 and 100, inclusive');

        if (a !== undefined) {
            if (typeof a !== 'number') throw new TypeError('`a` property of `hsl` must be a number');
            if (a < 0 || a > 1) throw new RangeError('`a` property of `hsl` must be between 0 and 1, inclusive');

            a = Math.min(Math.max(a, 0), 1);
        };

        h = ((h % 360) + 360) % 360 / 360;

        s /= 100;
        l /= 100;

        let r: number, g: number, b: number;

        if (s === 0) r = g = b = l;
        else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hueToRgb(p, q, h + 1 / 3);
            g = hueToRgb(p, q, h);
            b = hueToRgb(p, q, h - 1 / 3);
        };

        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);

        return this.fromRgb({ r, g, b, a });
    };

    /**
     * Creates a new Color instance from a CMYK object.
     * 
     * @param cmyk The CMYK object.
     * @returns The Color instance.
     * 
     * @example
     * const color = Color.fromCmyk({ c: 0, m: 100, y: 100, k: 0 });
     */
    public static fromCmyk(cmyk: CMYK): Color {
        if (typeof cmyk !== 'object') throw new TypeError('`cmyk` must be a CMYK object');

        let { c, m, y, k } = cmyk;

        if (typeof c !== 'number' || typeof m !== 'number' || typeof y !== 'number' || typeof k !== 'number') throw new TypeError('`cmyk` must have `c`, `m`, `y`, and `k` properties that are numbers');
        if (c < 0 || c > 100 || m < 0 || m > 100 || y < 0 || y > 100 || k < 0 || k > 100) throw new RangeError('`c`, `m`, `y`, and `k` properties of `cmyk` must be between 0 and 100, inclusive');

        c /= 100;
        m /= 100;
        y /= 100;
        k /= 100;

        const r = 255 * (1 - c) * (1 - k);
        const g = 255 * (1 - m) * (1 - k);
        const b = 255 * (1 - y) * (1 - k);

        return this.fromRgb({ r, g, b });
    };

    /**
     * Converts the color to a decimal color value.
     * 
     * @param byteOrder The order of the bytes in the decimal value. Defaults to `[RgbByte.Alpha, RgbByte.Red, RgbByte.Green, RgbByte.Blue]` (`0xAARRGGBB`).
     * @returns The decimal color value.
     * 
     * @example
     * const color = Color.fromHex("#FF5733");
     * 
     * console.log(color.toDecimal()); // 16729359
     * 
     * @example
     * const color = Color.fromHex("#FF5733FF");
     * 
     * console.log(color.toDecimal([RgbByte.Red, RgbByte.Green, RgbByte.Blue])); // 16729359
     */
    public toDecimal(byteOrder?: [RgbByte, RgbByte, RgbByte] | [RgbByte, RgbByte, RgbByte, RgbByte]): Decimal {
        if (!byteOrder) return this.decimal;
        else {
            if (!Array.isArray(byteOrder)) throw new TypeError('`byteOrder` must be an array of RgbByte values');
            if (byteOrder.length < 3 || byteOrder.length > 4) throw new RangeError('`byteOrder` must have 3 or 4 elements');

            const order: RgbByte[] = [];

            for (const byte of byteOrder) {
                if (!Object.values(RgbByte).includes(byte)) throw new TypeError('`byteOrder` must contain only RgbByte values');
                if (order.includes(byte)) throw new RangeError('`byteOrder` must not contain duplicate RgbByte values');

                order.push(byte);
            };

            const a = (this.decimal & 0xFF000000) !== 0 ? (this.decimal >> 24) & 0xFF : undefined;
            const r = (this.decimal >> 16) & 0xFF;
            const g = (this.decimal >> 8) & 0xFF;
            const b = this.decimal & 0xFF;

            const bytes: number[] = [];

            for (const byte of order) {
                switch (byte) {
                    case RgbByte.Alpha:
                        bytes.push(a ?? 0);

                        break;
                    case RgbByte.Red:
                        bytes.push(r);

                        break;
                    case RgbByte.Green:
                        bytes.push(g);

                        break;
                    case RgbByte.Blue:
                        bytes.push(b);

                        break;
                };
            };

            if (bytes.length === 3) return (bytes[0]! << 16) | (bytes[1]! << 8) | bytes[2]!;
            else return ((bytes[0]! << 24) | (bytes[1]! << 16) | (bytes[2]! << 8) | bytes[3]!) >>> 0;
        };
    };

    /**
     * Converts the color to a hexadecimal color code.
     * 
     * @param digits The number of digits in the hexadecimal color code. Must be 3, 4, 6, or 8. Defaults to 6 (or 8 if the color has an alpha channel).
     * @returns The hexadecimal color code (e.g. `#FFFFFF`).
     * 
     * @example
     * const color = Color.fromDecimal(0xFF5733FF);
     * 
     * console.log(color.toHex()); // "#FF5733FF"
     * 
     * @example
     * const color = Color.fromDecimal(0xFF5733FF);
     * 
     * console.log(color.toHex(6)); // "#5733FF"
     */
    public toHex(digits?: number): Hexadecimal {
        if (digits !== undefined) {
            if (typeof digits !== 'number') throw new TypeError('`digits` must be a number');
            if (![3, 4, 6, 8].includes(digits)) throw new RangeError('`digits` must be 3, 4, 6, or 8');
        };

        const fixedDigits = digits ?? (this.hasAlpha ? 8 : 6);

        let n = this.decimal;

        if (n < 0) n = n >>> 0;
        if (this.hasAlpha && (fixedDigits === 3 || fixedDigits === 6)) n &= 0x00FFFFFF;

        if (fixedDigits === 3 || fixedDigits === 4) {
            const full = n.toString(16).padStart(fixedDigits === 3 ? 6 : 8, '0');

            let short = '';

            for (let i = 0; i < full.length; i += 2) {
                short += full[i + 1];
            };

            return `#${short.toUpperCase()}`;
        } else return `#${n.toString(16).padStart(fixedDigits, '0').toUpperCase()}`;
    };

    /**
     * Converts the color to an RGB object.
     * 
     * @returns The RGB object.
     * 
     * @example
     * const color = Color.fromHex("#FF5733");
     * 
     * console.log(color.toRgb()); // { r: 255, g: 87, b: 51 }
     */
    public toRgb(): RGB {
        const a = this.decimal > 0xFFFFFF ? ((this.decimal >> 24) & 0xFF) / 255 : this.hasAlpha ? 0 : undefined;
        const r = (this.decimal >> 16) & 0xFF;
        const g = (this.decimal >> 8) & 0xFF;
        const b = this.decimal & 0xFF;

        return { r, g, b, a };
    };

    /**
     * Converts the color to an HSL object.
     * 
     * @returns The HSL object.
     * 
     * @example
     * const color = Color.fromHex("#FF5733");
     * 
     * console.log(color.toHsl()); // { h: 11, s: 100, l: 60 }
     */
    public toHsl(): HSL {
        const rgb = this.toRgb();

        let { r, g, b, a } = rgb;

        r /= 255;
        g /= 255;
        b /= 255;

        if (this.hasAlpha && a === undefined) a = 0;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        const d = max - min;

        let l = (max + min) / 2;

        let h: number;

        if (d === 0) h = 0;
        else if (max === r) h = ((g - b) / d) % 6;
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;

        h *= 60;

        if (h < 0) h += 360;

        let s: number;

        if (d === 0) s = 0;
        else s = d / (1 - Math.abs(2 * l - 1));

        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return { h, s, l, a };
    };

    /**
     * Converts the color to a CMYK object.
     * 
     * @returns The CMYK object.
     * 
     * @example
     * const color = Color.fromHex("#FF5733");
     * 
     * console.log(color.toCmyk()); // { c: 0, m: 66, y: 80, k: 0 }
     */
    public toCmyk(): CMYK {
        let { r, g, b } = this.toRgb();

        r /= 255;
        g /= 255;
        b /= 255;

        let c: number, m: number, y: number, k: number;

        k = 1 - Math.max(r, g, b);

        if (k === 1) c = m = y = 0;
        else {
            c = (1 - r - k) / (1 - k);
            m = (1 - g - k) / (1 - k);
            y = (1 - b - k) / (1 - k);
        };

        c = +(c * 100).toFixed(1);
        m = +(m * 100).toFixed(1);
        y = +(y * 100).toFixed(1);
        k = +(k * 100).toFixed(1);

        return { c, m, y, k };
    };

    /**
     * Lightens the color by a specified percentage.
     * 
     * @param amount The percentage to lighten the color by (0-100). Defaults to 20.
     * @returns The Color instance.
     * 
     * @example
     * const color = Color.fromHex('#FF5733');
     * 
     * // Lighten the color by 20%
     * console.log(color.lighten().toHex()); // "#FF7F66"
     */
    public lighten(amount: number = 20): Color {
        if (typeof amount !== 'number') throw new TypeError('`amount` must be a number');
        if (amount < 0 || amount > 100) throw new RangeError('`amount` must be between 0 and 100, inclusive');

        const hsl = this.toHsl();

        hsl.l = Math.min(hsl.l + amount, 100);

        this.update(Color.fromHsl(hsl));

        return this;
    };

    /**
     * Darkens the color by a specified percentage.
     * 
     * @param amount The percentage to darken the color by (0-100). Defaults to 20.
     * @returns The Color instance.
     * 
     * @example
     * const color = Color.fromHex('#FF5733');
     * 
     * // Darken the color by 20%
     * console.log(color.darken().toHex()); // "#CC4529"
     */
    public darken(amount: number = 20): Color {
        if (typeof amount !== 'number') throw new TypeError('`amount` must be a number');
        if (amount < 0 || amount > 100) throw new RangeError('`amount` must be between 0 and 100, inclusive');

        const hsl = this.toHsl();

        hsl.l = Math.max(hsl.l - amount, 0);

        this.update(Color.fromHsl(hsl));

        return this;
    };

    /**
     * Mixes the color with another Color instance by a specified percentage.
     * 
     * @param color The Color instance to mix with.
     * @param amount The percentage to mix the colors by (0-100). 0 keeps the original color, 100 keeps the other color. Defaults to 50.
     * @returns The Color instance.
     * 
     * @example
     * const color1 = Color.fromHex('#FF5733');
     * const color2 = Color.fromHex('#33FF57');
     * 
     * // Mix the two colors by 50%
     * console.log(color1.mix(color2).toHex()); // "#99A85A"
     */
    public mix(color: Color, amount: number = 50): Color {
        if (!(color instanceof Color)) throw new TypeError('`color` must be an instance of Color');
        if (typeof amount !== 'number') throw new TypeError('`amount` must be a number');
        if (amount < 0 || amount > 100) throw new RangeError('`amount` must be between 0 and 100, inclusive');

        const fixedAmount = amount / 100;

        const thisRgb = this.toRgb();
        const otherRgb = color.toRgb();

        const r = mixComponents(thisRgb.r, otherRgb.r, fixedAmount);
        const g = mixComponents(thisRgb.g, otherRgb.g, fixedAmount);
        const b = mixComponents(thisRgb.b, otherRgb.b, fixedAmount);

        const a = this.hasAlpha || color.hasAlpha ? mixComponents(this.hasAlpha ? (thisRgb.a! * 255) : 255, color.hasAlpha ? (otherRgb.a! * 255) : 255, fixedAmount) / 255 : undefined;

        this.update(Color.fromRgb({ r, g, b, a }));

        return this;
    };

    /**
     * Clones the current Color instance.
     * 
     * @returns A new Color instance with the same properties.
     * 
     * @example
     * const color = Color.fromHex('#FF5733');
     * 
     * // Clone the color
     * const clonedColor = color.clone();
     * console.log(clonedColor.toHex()); // "#FF5733"
     */
    public clone(): Color {
        return new Color(this.decimal, this.hasAlpha);
    };

    /**
     * Checks if the color has an alpha channel.
     * 
     * @returns `true` if the color has an alpha channel, `false` otherwise.
     * 
     * @example
     * const color = Color.fromHex('#FF5733');
     * 
     * // Check if the color has an alpha channel
     * console.log(color.hasAlphaChannel); // false
     * 
     * @example
     * const colorWithAlpha = Color.fromHex('#FF5733FF');
     * 
     * // Check if the color has an alpha channel
     * console.log(colorWithAlpha.hasAlphaChannel); // true
     */
    public get hasAlphaChannel(): boolean {
        return this.hasAlpha;
    };

    /**
     * Returns the lightness percentage of the color.
     * 
     * @returns The lightness of the color.
     * 
     * @example
     * const color = Color.fromHex('#FF5733');
     * 
     * // Get lightness
     * console.log(color.lightness); // 60
     */
    public get lightness(): number {
        const hsl = this.toHsl();

        return hsl.l;
    };

    /**
     * Checks if the color is light.
     * 
     * @returns `true` if the color is light, `false` otherwise.
     * 
     * @example
     * const color = Color.fromHex('#FF5733');
     * 
     * // Check if the color is light
     * console.log(color.isLight); // true
     */
    public get isLight(): boolean {
        return this.lightness >= 50;
    };

    /**
     * Checks if the color is dark.
     * 
     * @returns `true` if the color is dark, `false` otherwise.
     * 
     * @example
     * const color = Color.fromHex('#FF5733');
     * 
     * // Check if the color is dark
     * console.log(color.isDark); // false
     */
    public get isDark(): boolean {
        return this.lightness < 50;
    };

    /**
     * Returns the decimal representation of the color.
     * 
     * @return The decimal representation of the color.
     * 
     * @example
     * const color = Color.fromHex('#FF5733');
     * 
     * // Get decimal value
     * console.log(color.valueOf()); // 16729359
     */
    public valueOf(): number {
        return this.decimal;
    };

    /**
     * Returns a string representation of the color in hexadecimal format.
     * 
     * @returns A string representation of the color.
     * 
     * @example
     * const color = Color.fromRgb({ r: 255, g: 87, b: 51 });
     * 
     * // Convert to string
     * console.log(color.toString()); // "#FF5733"
     */
    public toString(): string {
        return this.toHex();
    };

    /**
     * Returns a JSON representation of the color.
     * 
     * @returns A JSON representation of the color.
     * 
     * @example
     * const color = Color.fromHex('#FF5733');
     * 
     * // Convert to JSON
     * console.log(color.toJSON()); // { decimal: 16729359, hex: '#FF5733', ... }
     */
    public toJSON(): { decimal: Decimal, hex: Hexadecimal, rgb: RGB, hsl: HSL, cmyk: CMYK } {
        return {
            decimal: this.decimal,
            hex: this.toHex(),
            rgb: this.toRgb(),
            hsl: this.toHsl(),
            cmyk: this.toCmyk()
        };
    };
};
