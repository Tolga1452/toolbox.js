export default function mixComponents(c1: number, c2: number, amount: number): number {
    return Math.round(c1 + (c2 - c1) * amount);
};
