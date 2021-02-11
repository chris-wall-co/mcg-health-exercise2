import {
    test,
    expect,
    describe
} from '@jest/globals';
import Grid from '../../src/positional/Grid';

describe('[Grid] Test the class functionality meets expectations', () => {

    /** Simple Class Validation */
    test('Values are set as expected', () => {
        const h = 10;
        const w = 11;

        const grid = new Grid(h, w);
        expect(grid.width).toBe(w);
        expect(grid.height).toBe(h);
    });

    test('Bounds check should be accurate', () => {
        const grid = new Grid(5, 5);
        expect(grid.isInBounds(0, 1)).toBe(true);
        expect(grid.isInBounds(5, 5)).toBe(true);
        expect(grid.isInBounds(1, 6)).toBe(false);
        expect(grid.isInBounds(6, 1)).toBe(false);
    });

    /** Negative tests */

    // As the bottom, left corner of the Grid is marked as 0,0 we should disallow anything less than 1
    test('Area values cannot be negative', () => {
        expect(() => new Grid(-5, 5)).toThrow();
        expect(() => new Grid(5, -5)).toThrow();
    });
});

