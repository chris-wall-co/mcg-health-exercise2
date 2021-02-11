import {
    test,
    expect,
    describe
} from '@jest/globals';
import {
    AXIS,
    ADJUSTMENT
} from '../../src/Enumerations';
import Adjustment from '../../src/positional/Adjustment';

describe('[Adjustment] Test the class functionality meets expectations', () => {

    /** Simple Class Validation */
    test('Values are set as expected', () => {
        const adj = new Adjustment(AXIS.X, ADJUSTMENT.BACKWARD);
        expect(adj.amount).toBe(-1);
        expect(adj.axis).toBe('x');
    });

    /** Negative tests */

    test('Amount must be a number', () => {
        expect(() => new Adjustment(AXIS.Y, 'B')).toThrow();
    });

    test('Axis must be a valid value', () => {
        expect(() => new Adjustment('B', 1)).toThrow();
    });
});

