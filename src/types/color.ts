/**
 * A Decimal (Packed Integer) color type is a number that represents a color in a packed format.
 */
export type Decimal = number;

/**
 * A Hexadecimal color type is a string that starts with a '#'.
 */
export type Hexadecimal = `#${string}`;

/**
 * An RGB color type is an object with red, green, and blue components
 */
export interface RGB {
    /**
     * The red component of the color, ranging from 0 to 255. Must be an integer.
     */
    r: number;
    /**
     * The green component of the color, ranging from 0 to 255. Must be an integer.
     */
    g: number;
    /**
     * The blue component of the color, ranging from 0 to 255. Must be an integer.
     */
    b: number;
    /**
     * The alpha component of the color, ranging from 0 to 1. 
     */
    a?: number;
};

/**
 * An HSL color type is an object with hue, saturation, and lightness components.
 */
export interface HSL {
    /**
     * The hue component of the color, ranging from 0 to 360.
     */
    h: number;
    /**
     * The saturation component of the color, ranging from 0 to 100.
     */
    s: number;
    /**
     * The lightness component of the color, ranging from 0 to 100.
     */
    l: number;
    /**
     * The alpha component of the color, ranging from 0 to 1.
     */
    a?: number;
};

/**
 * A CMYK color type is an object with cyan, magenta, yellow, and black components.
 */
export interface CMYK {
    /**
     * The cyan component of the color, ranging from 0 to 100.
     */
    c: number;
    /**
     * The magenta component of the color, ranging from 0 to 100.
     */
    m: number;
    /**
     * The yellow component of the color, ranging from 0 to 100.
     */
    y: number;
    /**
     * The black component of the color, ranging from 0 to 100.
     */
    k: number;
};

/**
 * A type that can represent any color format supported by the library.
 * This includes Decimal, Hexadecimal, RGB, HSL, and CMYK.
 */
export type AnyColor = Decimal | Hexadecimal | RGB | HSL | CMYK;

/**
 * An enumeration of the color channels in an RGB color, useful for accessing RGB components in a Decimal representation.
 * 
 * The values correspond to the indices of the red, green, blue, and alpha components in a packed integer format.
 */
export enum RgbByte {
    /**
     * An enum value representing the red channel in an RGB color.
     */
    Red = 0,
    /**
     * An enum value representing the green channel in an RGB color.
     */
    Green = 1,
    /**
     * An enum value representing the blue channel in an RGB color.
     */
    Blue = 2,
    /**
     * An enum value representing the alpha channel in an RGB color.
     */
    Alpha = 3
};
