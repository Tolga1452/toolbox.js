/**
 * The time units.
 */
export enum TimeUnit {
    Millisecond = 1,
    Second = 1000,
    Minute = 60000,
    Hour = 3600000,
    Day = 86400000,
    Week = 604800000,
    Year = 31557600000
};

/**
 * JSON representation of the Time class.
 */
export interface TimeJson {
    ms: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    weeks: number;
    years: number;
};
