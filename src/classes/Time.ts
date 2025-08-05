import { TimeJson, TimeUnit } from '../types/time.js';

/**
 * A utility class for handling time durations with various units and operations.
 *
 * The Time class provides a convenient way to work with time durations, offering
 * conversion between different time units, arithmetic operations, and formatting
 * capabilities. All internal calculations are done in milliseconds for precision.
 *
 * @example
 * // Create time instances using static constructors
 * const oneSecond = Time.fromMilliseconds(1000);
 * const twoMinutes = Time.fromMinutes(2);
 * const oneHour = Time.fromHours(1);
 *
 * @example
 * // Convert between units
 * const time = Time.fromMilliseconds(90000); // 90 seconds in milliseconds
 * console.log(time.toSeconds()); // 90
 * console.log(time.toMinutes()); // 1.5
 * console.log(time.toHours()); // 0.025
 *
 * @example
 * // Perform arithmetic operations
 * const time1 = Time.fromMilliseconds(1000);
 * const time2 = Time.fromMilliseconds(500);
 * time1.add(time2); // time1 is now 1500ms
 * time1.subtract(300); // time1 is now 1200ms
 *
 * @example
 * // String representation and JSON conversion
 * const duration = Time.fromMilliseconds(3661000); // 1 hour, 1 minute, 1 second
 * console.log(duration.toString()); // "1 hour, 1 minute, 1 second"
 * console.log(duration.toJSON()); // { ms: 3661000, seconds: 3661, minutes: 61.02, ... }
 *
 * @example
 * // Using valueOf for mathematical operations
 * const time = Time.fromMilliseconds(1000);
 * const doubled = time * 2; // 2000
 * const sum = time + 500; // 1500
 *
 * // Note: When using TypeScript, you may need to explicitly convert the Time class to its value with the `+` operator or the `valueOf` method.
 *
 * const doubled = +time * 2; // 2000
 * const sum = time.valueOf() + 500; // 1500
 *
 * @example
 * // Copying a Time instance
 * const original = Time.fromMilliseconds(5000);
 * const copy = Time.fromMilliseconds(original.valueOf()); // Creates a copy with the same duration
 */
export class Time {
    private constructor(private ms: number) { };

    /**
     * Creates a Time instance from milliseconds.
     * 
     * @param ms The time duration in milliseconds. Must be a non-negative number.
     * @returns A new Time instance.
     */
    public static fromMilliseconds(ms: number): Time {
        if (typeof ms !== 'number' || isNaN(ms)) throw new TypeError('`ms` must be a number');
        if (ms < 0) throw new RangeError('`ms` must be 0 or greater');

        return new this(ms);
    };

    /**
     * Creates a Time instance from seconds.
     * 
     * @param seconds The time duration in seconds. Must be a non-negative number.
     * @returns A new Time instance.
     */
    public static fromSeconds(seconds: number): Time {
        if (typeof seconds !== 'number' || isNaN(seconds)) throw new TypeError('`seconds` must be a number');
        if (seconds < 0) throw new RangeError('`seconds` must be 0 or greater');

        return new this(seconds * TimeUnit.Second);
    };

    /**
     * Creates a Time instance from minutes.
     * 
     * @param minutes The time duration in minutes. Must be a non-negative number.
     * @returns A new Time instance.
     */
    public static fromMinutes(minutes: number): Time {
        if (typeof minutes !== 'number' || isNaN(minutes)) throw new TypeError('`minutes` must be a number');
        if (minutes < 0) throw new RangeError('`minutes` must be 0 or greater');

        return new this(minutes * TimeUnit.Minute);
    };

    /**
     * Creates a Time instance from hours.
     * 
     * @param hours The time duration in hours. Must be a non-negative number.
     * @returns A new Time instance.
     */
    public static fromHours(hours: number): Time {
        if (typeof hours !== 'number' || isNaN(hours)) throw new TypeError('`hours` must be a number');
        if (hours < 0) throw new RangeError('`hours` must be 0 or greater');

        return new this(hours * TimeUnit.Hour);
    };

    /**
     * Creates a Time instance from days.
     * 
     * @param days The time duration in days. Must be a non-negative number.
     * @returns A new Time instance.
     */
    public static fromDays(days: number): Time {
        if (typeof days !== 'number' || isNaN(days)) throw new TypeError('`days` must be a number');
        if (days < 0) throw new RangeError('`days` must be 0 or greater');

        return new this(days * TimeUnit.Day);
    };

    /**
     * Creates a Time instance from weeks.
     * 
     * @param weeks The time duration in weeks. Must be a non-negative number.
     * @returns A new Time instance.
     */
    public static fromWeeks(weeks: number): Time {
        if (typeof weeks !== 'number' || isNaN(weeks)) throw new TypeError('`weeks` must be a number');
        if (weeks < 0) throw new RangeError('`weeks` must be 0 or greater');

        return new this(weeks * TimeUnit.Week);
    };

    /**
     * Creates a Time instance from years.
     * 
     * @param years The time duration in years. Must be a non-negative number.
     * @returns A new Time instance.
     */
    public static fromYears(years: number): Time {
        if (typeof years !== 'number' || isNaN(years)) throw new TypeError('`years` must be a number');
        if (years < 0) throw new RangeError('`years` must be 0 or greater');

        return new this(years * TimeUnit.Year);
    };

    /**
     * Converts the time duration to milliseconds.
     * 
     * @returns The time duration in milliseconds.
     */
    public toMilliseconds(): number {
        return this.ms;
    };

    /**
     * Converts the time duration to seconds.
     * 
     * @returns The time duration in seconds.
     */
    public toSeconds(): number {
        return this.ms / TimeUnit.Second;
    };

    /**
     * Converts the time duration to minutes.
     * 
     * @returns The time duration in minutes.
     */
    public toMinutes(): number {
        return this.ms / TimeUnit.Minute;
    };

    /**
     * Converts the time duration to hours.
     * 
     * @returns The time duration in hours.
     */
    public toHours(): number {
        return this.ms / TimeUnit.Hour;
    };

    /**
     * Converts the time duration to days.
     * 
     * @returns The time duration in days.
     */
    public toDays(): number {
        return this.ms / TimeUnit.Day;
    };

    /**
     * Converts the time duration to weeks.
     * 
     * @returns The time duration in weeks.
     */
    public toWeeks(): number {
        return this.ms / TimeUnit.Week;
    };

    /**
     * Converts the time duration to years.
     * 
     * @returns The time duration in years.
     */
    public toYears(): number {
        return this.ms / TimeUnit.Year;
    };

    /**
     * Adds a time duration to this instance.
     * 
     * @param time The time duration to add. Must be a `Time` instance or a number in milliseconds.
     * @returns The updated Time instance.
     * 
     * @example
     * const time = new Time(1000);
     * 
     * // Add another Time instance
     * time.add(new Time(500)); // Adds 500 ms
     * console.log(time.ms); // 1500
     * 
     * // Add a number in milliseconds
     * time.add(2000); // Adds 2000 ms
     * console.log(time.ms); // 3500
     */
    public add(time: number | Time): Time {
        if (time instanceof Time) {
            this.ms += time.ms;

            return this;
        } else if (typeof time === 'number') {
            this.ms += time;

            return this;
        } else throw new TypeError('`time` must be a `Time` instance or a number');
    };

    /**
     * Subtracts a time duration from this instance.
     * 
     * @param time The time duration to subtract. Must be a `Time` instance or a number in milliseconds.
     * @returns The updated Time instance.
     * 
     * @example
     * const time = new Time(2000);
     * 
     * // Subtract another Time instance
     * time.subtract(new Time(500)); // Subtracts 500 ms
     * console.log(time.ms); // 1500
     * 
     * // Subtract a number in milliseconds
     * time.subtract(1000); // Subtracts 1000 ms
     * console.log(time.ms); // 500
     */
    public subtract(time: number | Time): Time {
        if (time instanceof Time) {
            this.ms -= time.ms;

            return this;
        } else if (typeof time === 'number') {
            this.ms -= time;

            return this;
        } else throw new TypeError('`time` must be a `Time` instance or a number');
    };

    /**
     * Returns the time duration in milliseconds.
     * 
     * @return The time duration.
     * 
     * @example
     * const time = new Time(1000);
     * 
     * // Get the time duration in milliseconds
     * console.log(time.valueOf()); // 1000
     * 
     * // You can use it in math operations
     * // (in TypeScript, you may need to explicitly convert it with the `+` operator or the `valueOf` method)
     * console.log(time + +500); // 1500
     */
    public valueOf(): number {
        return this.ms;
    };

    /**
     * Returns a string representation of the time duration in milliseconds.
     * 
     * @returns A string representation of the time.
     * 
     * @example
     * const time = new Time(70000);
     * 
     * // Convert to string
     * console.log(time.toString()); // "1 minute, 10 seconds"
     */
    public toString(): string {
        let timeLeft = this.ms;

        const years = Math.floor(this.toYears());

        timeLeft -= years * TimeUnit.Year;

        const weeks = Math.floor(new Time(timeLeft).toWeeks());

        timeLeft -= weeks * TimeUnit.Week;

        const days = Math.floor(new Time(timeLeft).toDays());

        timeLeft -= days * TimeUnit.Day;

        const hours = Math.floor(new Time(timeLeft).toHours());

        timeLeft -= hours * TimeUnit.Hour;

        const minutes = Math.floor(new Time(timeLeft).toMinutes());

        timeLeft -= minutes * TimeUnit.Minute;

        const seconds = Math.floor(new Time(timeLeft).toSeconds());

        timeLeft -= seconds * TimeUnit.Second;

        let result = '';

        if (years > 0) result += `${years} year${years > 1 ? 's' : ''}, `;
        if (weeks > 0) result += `${weeks} week${weeks > 1 ? 's' : ''}, `;
        if (days > 0) result += `${days} day${days > 1 ? 's' : ''}, `;
        if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''}, `;
        if (minutes > 0) result += `${minutes} minute${minutes > 1 ? 's' : ''}, `;
        if (seconds > 0) result += `${seconds} second${seconds > 1 ? 's' : ''}, `;
        if (timeLeft > 0) result += `${timeLeft} millisecond${timeLeft > 1 ? 's' : ''}`;

        result = result.replace(/, $/, '');

        return result;
    };

    /**
     * Converts the class instance to a JSON representation.
     * 
     * @returns A JSON representation of the class instance.
     * 
     * @example
     * const time = new Time(60000);
     * 
     * // Convert to JSON
     * console.log(time.toJSON()); // { ms: 60000, seconds: 60, minutes: 1, ... }
     */
    public toJSON(): TimeJson {
        return {
            ms: this.ms,
            seconds: this.toSeconds(),
            minutes: this.toMinutes(),
            hours: this.toHours(),
            days: this.toDays(),
            weeks: this.toWeeks(),
            years: this.toYears()
        }
    };
};
