import gcdOf2 from './gcdOf2.js';

export default function lcmOf2(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);

    if (a === 0 || b === 0) return 0;
    if (a === 1) return b;
    if (b === 1) return a;
    if (a === b) return a;
    if (a % b === 0) return a;
    if (b % a === 0) return b;

    return (a / gcdOf2(a, b)) * b;
};
