import { TimeUnit } from '../types/time.js';

export const HEX_FORMAT = /^#(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

const TIME_UNIT_ALT = '(?:milliseconds?|msecs?|msec|ms|seconds?|secs?|sec|s|minutes?|mins?|min|m|hours?|hrs?|hr|h|days?|d|weeks?|wks?|wk|w|years?|yrs?|yr|y)';

export const TIME_STRING_FORMAT = new RegExp(String.raw`^\s*(?:\d+(?:\.\d+)?\s*${TIME_UNIT_ALT}\b)(?:\s+\d+(?:\.\d+)?\s*${TIME_UNIT_ALT}\b)*\s*$`);

export const TIME_UNIT_FORMAT = new RegExp(String.raw`(\d+(?:\.\d+)?)(?:\s*)(${TIME_UNIT_ALT})\b`, 'g');

export const TIME_UNIT_MAP: Map<string, TimeUnit> = new Map([
    ['ms', TimeUnit.Millisecond], ['msec', TimeUnit.Millisecond], ['msecs', TimeUnit.Millisecond], ['millisecond', TimeUnit.Millisecond], ['milliseconds', TimeUnit.Millisecond],
    ['s', TimeUnit.Second], ['sec', TimeUnit.Second], ['secs', TimeUnit.Second], ['second', TimeUnit.Second], ['seconds', TimeUnit.Second],
    ['m', TimeUnit.Minute], ['min', TimeUnit.Minute], ['mins', TimeUnit.Minute], ['minute', TimeUnit.Minute], ['minutes', TimeUnit.Minute],
    ['h', TimeUnit.Hour], ['hr', TimeUnit.Hour], ['hrs', TimeUnit.Hour], ['hour', TimeUnit.Hour], ['hours', TimeUnit.Hour],
    ['d', TimeUnit.Day], ['day', TimeUnit.Day], ['days', TimeUnit.Day],
    ['w', TimeUnit.Week], ['wk', TimeUnit.Week], ['wks', TimeUnit.Week], ['week', TimeUnit.Week], ['weeks', TimeUnit.Week],
    ['y', TimeUnit.Year], ['yr', TimeUnit.Year], ['yrs', TimeUnit.Year], ['year', TimeUnit.Year], ['years', TimeUnit.Year]
]);
