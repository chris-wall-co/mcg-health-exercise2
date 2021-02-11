import {
    test,
    expect,
    describe,
    beforeAll
} from '@jest/globals';
import RoverParser from '../../src/input-parser/RoverParser';

describe('[RoverParser] Test the functionality used to parse the rover specific user input.', () => {

    /** @type {RoverParser} */
    let parser;

    beforeAll(() => {
        parser = new RoverParser();
    });

    test('Should take a valid string and correctly map the input to results', () => {
        const result = parser.parse('1 3 N LLMRMMLM');
        expect(result.startX).toBe(1);
        expect(result.startY).toBe(3);
        expect(result.startDir).toBe('N');
        expect(result.commands).toBe('LLMRMMLM');
    });

    test('Negative testing of expected exceptions in parse function.', () => {

        // -- startX must be numeric
        expect(() => parser.parse('A 3 N LLM')).toThrow();

        // -- startY must be numeric
        expect(() => parser.parse('1 A N LLMM')).toThrow();

        // -- missing command data
        expect(() => parser.parse('1 3 N ')).toThrow();
    });
});