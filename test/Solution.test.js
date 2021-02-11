import {
    test,
    expect,
    describe
} from '@jest/globals';
import { EOL } from 'os';
import Solution from '../src/solution';

describe('Solution integrated test', () => {

    test('Scenario 1', () => {
        const script = `
        5 5
        1 2 N
        LMLMLMLMM
        3 3 E
        MMRMMRMRRM
        `;

        const expected = `1 3 N${EOL}5 1 E`;

        const sol = new Solution();
        const actual = sol.receiveInputBlock(script);

        expect(actual).toBe(expected);
    });

    test('Scenario 2', () => {
        const script = `
        3 3
        0 0 S
        LMMLM
        1 2 W
        LMLMRM
        `;

        // DEV NOTE: the provided requirement stated that the expected output for this scenaio would be 2 1 N{EOL}1 0 S, however, this is incorrect given the instruction to the second rover which results in 2 0 S
        // the accceptance criteria here has been changed from spec to reflect
        const expected = `2 1 N${EOL}2 0 S`;

        const sol = new Solution();
        const actual = sol.receiveInputBlock(script);

        expect(actual).toBe(expected);
    });
});