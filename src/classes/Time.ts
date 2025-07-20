import { TimeJson, TimeUnit } from '../types/time.js';

/**
 * A utility class for handling time durations with various units and operations.
 * 
 * The Time class provides a convenient way to work with time durations, offering
 * conversion between different time units, arithmetic operations, and formatting
 * capabilities. All internal calculations are done in milliseconds for precision.
 * 
 * @example
 * // Create time instances
 * const oneSecond = new Time(1000); // 1000 milliseconds
 * const twoMinutes = new Time(2, TimeUnit.Minute);
 * const oneHour = new Time(1, TimeUnit.Hour);
 * 
 * @example
 * // Convert between units
 * const time = new Time(90000); // 90 seconds in milliseconds
 * console.log(time.toSeconds()); // 90
 * console.log(time.toMinutes()); // 1.5
 * console.log(time.toHours()); // 0.025
 * 
 * @example
 * // Perform arithmetic operations
 * const time1 = new Time(1000);
 * const time2 = new Time(500);
 * time1.add(time2); // time1 is now 1500ms
 * time1.subtract(300); // time1 is now 1200ms
 * 
 * @example
 * // String representation and JSON conversion
 * const duration = new Time(3661000); // 1 hour, 1 minute, 1 second
 * console.log(duration.toString()); // "1 hour, 1 minute, 1 second"
 * console.log(duration.toJSON()); // { ms: 3661000, seconds: 3661, minutes: 61.02, ... }
 * 
 * @example
 * // Using valueOf for mathematical operations
 * const time = new Time(1000);
 * const doubled = time.valueOf() * 2; // 2000
 * const sum = time + 500; // Works due to valueOf() implementation. When using TypeScript, you may need to explicitly convert it with the `+` operator or the `valueOf` method.
 * 
 * @example
 * // Copy constructor
 * const original = new Time(5000);
 * const copy = new Time(original); // Creates a copy with the same duration
 */
export class Time {
    /**
     * The time duration in milliseconds.
     */
    public ms: number;

    /**
     * Creates a new Time instance.
     * 
     * @param time The time duration value.
     * @param from The unit of the time duration value. Defaults to `TimeUnit.Millisecond`.
     */
    constructor(time: number | Time, from: TimeUnit = TimeUnit.Millisecond) {
        if (typeof time !== 'number' && !(time instanceof Time)) throw new TypeError('`time` must be a number or a Time instance');

        if (time instanceof Time) {
            this.ms = time.ms;

            return;
        };

        if (time < 0) throw new RangeError('`time` must be 0 or greater');
        if (!Object.values(TimeUnit).includes(from)) throw new TypeError('`from` must be a valid `TimeUnit`');

        this.ms = from * time;
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
