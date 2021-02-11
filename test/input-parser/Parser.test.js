import {
    test,
    expect,
    describe,
    beforeAll
} from '@jest/globals';
import Parser from '../../src/input-parser/Parser';

describe('[Parser] Test the functionality used to parse user input into object data.', () => {

    /** @type {Parser} */
    let parser;

    beforeAll(() => {
        parser = new Parser();
    });

    test('Should take a valid string and correctly map the input to the results.', () => {
        const result = parser.parseInputs(`
        8 12
        1 3 N
        LLRMM
        5 2 E
        LMRM
        `);

        expect(result.plateau.maxX).toBe(8);
        expect(result.plateau.maxY).toBe(12);
        expect(result.rovers.length).toBe(2);
        expect(result.rovers[0].startX).toBe(1);
        expect(result.rovers[0].startY).toBe(3);
        expect(result.rovers[0].startDir).toBe('N');
        expect(result.rovers[0].commands).toBe('LLRMM');
        expect(result.rovers[1].startX).toBe(5);
        expect(result.rovers[1].startY).toBe(2);
        expect(result.rovers[1].startDir).toBe('E');
        expect(result.rovers[1].commands).toBe('LMRM');
    });

    test('Negative testing of expected exceptions in parse function.', () => {
        
        // -- no data provided
        expect(() => parser.parseInputs('')).toThrow();
        
        // -- no rover data provided
        expect(() => parser.parseInputs('8 12')).toThrow();

        // -- partial rover data provided
        expect(() => parser.parseInputs(`
        8 12
        1 3 N
        LMRMRM
        4 7 W
        `)).toThrow();
    });
});
