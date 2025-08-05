/**
 * The time units.
 */
export enum TimeUnit {
    /**
     * The millisecond unit.
     */
    Millisecond = 1,
    /**
     * The second unit.
     */
    Second = 1000,
    /**
     * The minute unit.
     */
    Minute = 60000,
    /**
     * The hour unit.
     */
    Hour = 3600000,
    /**
     * The day unit.
     */
    Day = 86400000,
    /**
     * The week unit.
     */
    Week = 604800000,
    /**
     * The year unit. (365 days and 6 hours)
     */
    Year = 31557600000
};

/**
 * JSON representation of the Time class.
 */
export interface TimeJson {
    /**
     * The time duration in milliseconds.
     */
    ms: number;
    /**
     * The time duration in seconds.
     */
    seconds: number;
    /**
     * The time duration in minutes.
     */
    minutes: number;
    /**
     * The time duration in hours.
     */
    hours: number;
    /**
     * The time duration in days.
     */
    days: number;
    /**
     * The time duration in weeks.
     */
    weeks: number;
    /**
     * The time duration in years.
     */
    years: number;
};
