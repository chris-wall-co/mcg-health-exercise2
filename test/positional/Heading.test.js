import {
    test,
    expect,
    describe
} from '@jest/globals';
import {
    AXIS,
    ADJUSTMENT,
    HEADING
} from '../../src/Enumerations';
import Adjustment from '../../src/positional/Adjustment';
import Heading from '../../src/positional/Heading';

describe('[Heading] Test the class functionality meets expectations', () => {

    /** Simple Class Validation */
    test('Values are set as expected', () => {

        const adj = new Adjustment(AXIS.X, ADJUSTMENT.BACKWARD);
        const heading = new Heading(HEADING.WEST, adj);

        expect(heading.adjustments.length).toBe(1);
        expect(heading.direction).toBe(HEADING.WEST);
    });

    /** Negative tests */

    test('Direction must be valid string', () => {
        expect(() => new Heading('B', new Adjustment(AXIS.Y, ADJUSTMENT.BACKWARD))).toThrow();
    });

    test('Must receive at least one Adjustment', () => {
        expect(() => new Heading(HEADING.WEST)).toThrow();
    });
});

