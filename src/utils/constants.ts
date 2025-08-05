import { TimeUnit } from '../types/time.js';

export const HEX_FORMAT = /^#(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

export const TIME_STRING_FORMAT = /^\s*(?:[+-]?\d+(?:\.\d+)?\s*(?:milliseconds?|msecs?|ms|years?|yrs?|y|weeks?|wks?|w|days?|d|hours?|hrs?|h|minutes?|mins?|min|m|seconds?|secs?|sec|s))(?:\s*(?:,|\band\b)?\s*[+-]?\d+(?:\.\d+)?\s*(?:milliseconds?|msecs?|ms|years?|yrs?|y|weeks?|wks?|w|days?|d|hours?|hrs?|h|minutes?|mins?|min|m|seconds?|secs?|sec|s))*\s*$/i;

export const TIME_UNIT_FORMAT = /([+-]?\d+(?:\.\d+)?)\s*(milliseconds?|msecs?|ms|years?|yrs?|y|weeks?|wks?|w|days?|d|hours?|hrs?|h|minutes?|mins?|min|m|seconds?|secs?|sec|s)/gi;

export const TIME_UNIT_MAP: Map<string, TimeUnit> = new Map([
    ['ms', TimeUnit.Millisecond], ['msec', TimeUnit.Millisecond], ['msecs', TimeUnit.Millisecond], ['millisecond', TimeUnit.Millisecond], ['milliseconds', TimeUnit.Millisecond],
    ['s', TimeUnit.Second], ['sec', TimeUnit.Second], ['secs', TimeUnit.Second], ['second', TimeUnit.Second], ['seconds', TimeUnit.Second],
    ['m', TimeUnit.Minute], ['min', TimeUnit.Minute], ['mins', TimeUnit.Minute], ['minute', TimeUnit.Minute], ['minutes', TimeUnit.Minute],
    ['h', TimeUnit.Hour], ['hr', TimeUnit.Hour], ['hrs', TimeUnit.Hour], ['hour', TimeUnit.Hour], ['hours', TimeUnit.Hour],
    ['d', TimeUnit.Day], ['day', TimeUnit.Day], ['days', TimeUnit.Day],
    ['w', TimeUnit.Week], ['wk', TimeUnit.Week], ['wks', TimeUnit.Week], ['week', TimeUnit.Week], ['weeks', TimeUnit.Week],
    ['y', TimeUnit.Year], ['yr', TimeUnit.Year], ['yrs', TimeUnit.Year], ['year', TimeUnit.Year], ['years', TimeUnit.Year]
]);
