import { binomCoef } from './binomCoef.js';

/**
 * Returns the probability of the binomial distribution.
 *
 * Suppose a biased coin comes up heads with probability 0.3 when tossed. The probability of seeing exactly 4 heads in 6 tosses is `binomProb(4, 6, 0.3)`.
 *
 * @param successes The amount of successes. Must be an integer greater than or equal to `0` and less than or equal to `trials`.
 * @param trials The number of trials. Must be an integer greater than or equal to `0`.
 * @param probability The probability of success. Must be a number from `0` to `1`, inclusive. If you want to use a percentage, convert it to a decimal by dividing by `100` (e.g. `50%` becomes `0.5`).
 * @returns The probability.
 * 
 * @example
 * binomProb(4, 6, 0.3); // 0.05953499999999999
 */
export function binomProb(successes: number, trials: number, probability: number): number {
    if (!Number.isInteger(successes)) throw new TypeError('`successes` must be an integer');
    if (!Number.isInteger(trials)) throw new TypeError('`trials` must be an integer');
    if (typeof probability !== 'number') throw new TypeError('`probability` must be a number');
    if (successes < 0) throw new RangeError('`successes` must be greater than or equal to 0');
    if (trials < 0) throw new RangeError('`trials` must be greater than or equal to 0');
    if (successes > trials) throw new RangeError('`successes` must be less than or equal to `trials`');
    if (probability < 0 || probability > 1) throw new RangeError('`probability` must be between 0 and 1, inclusive');

    return binomCoef(trials, successes) * (probability ** successes) * ((1 - probability) ** (trials - successes));
};
