export default function gcdOf2(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);

    if (a === 0 || b === 0) return a + b;
    if (a === 1 || b === 1) return 1;
    if (a === b) return a;

    while (b !== 0) {
        const x = b;

        b = a % b;
        a = x;
    };

    return a;
};
