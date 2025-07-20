/**
 * Checks whether the given value is `true` or `false`. If the value is `true`, returns the first parameter, otherwise returns the second parameter.
 * 
 * **Note:** You don't have to give a boolean to `value`. For example `"text"` is returns `true` and `""` is returns `false`, or `1` is returns `true` and `0` is returns `false`.
 * @deprecated Use the ternary operator (`value ? ifTrue : ifFalse`) instead.
 * 
 * @param value The value to check.
 * @param ifTrue The value to return if the value is `true`.
 * @param ifFalse The value to return if the value is `false`.
 * @returns The value.
 * 
 * @example
 * check(true, "Hello", "World"); // "Hello"
 * check(false, "Hello", "World"); // "World"
 * check("text", "Hello", "World"); // "Hello"
 * check("", "Hello", "World"); // "World"
 */
export function check(value: any, ifTrue: any, ifFalse: any): any {
    return value ? ifTrue : ifFalse;
};
