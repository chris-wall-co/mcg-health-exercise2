import {
    test,
    expect,
    describe,
    beforeAll
} from '@jest/globals';
import PlateauParser from '../../src/input-parser/PlateauParser';

describe('[PlateauParser] Test the functionality used to parse the plateau specific user input.', () => {
    
    /** @type {PlateauParser} */
    let parser;

    beforeAll(() => {
        parser = new PlateauParser();
    });

    test('Should take a valid string and correctly map the input to results', () => {
        const result = parser.parse('8 12');
        expect(result.maxX).toBe(8);
        expect(result.maxY).toBe(12);
    });

    test('Negative testing of expected exceptions in parse function.', () => {

        // -- first value must be numeric
        expect(() => parser.parse('A 6')).toThrow();

        // -- second value must also be numeric
        expect(() => parser.parse('6 A')).toThrow();
    });
});
