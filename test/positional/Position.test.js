import {
    test,
    expect,
    describe
} from '@jest/globals';
import Position from '../../src/positional/Position';

describe('[Position] Test that the class functionality meets expectations.', () => {

    /** Simple Class Validation */
    test('Values are set as expected', () => {
        const x = 6;
        const y = 7;

        const pos = new Position(x, y);
        expect(pos.x).toBe(x);
        expect(pos.y).toBe(y);
    });

    /** Negative tests */

    // As the bottom, left corner of the Grid is marked as 0,0 we should disallow negatives in Positioning
    test('Coordinate values cannot be negative', () => {
        expect(() => new Position(-1, 0)).toThrow();
        expect(() => new Position(2, -5)).toThrow();
    });
});