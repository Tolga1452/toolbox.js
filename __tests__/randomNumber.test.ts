import { randomNumber } from '../';

describe('randomNumber', () => {
    it('should generate a random number between the given min and max', () => {
        const min = 0;
        const max = 10;

        for (let i = 0; i < 10; i++) {
            const num = randomNumber(min, max);
            expect(num).toBeGreaterThanOrEqual(min);
            expect(num).toBeLessThanOrEqual(max);
        }
    });
});