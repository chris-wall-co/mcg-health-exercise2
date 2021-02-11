import {
    test,
    expect,
    describe,
    beforeEach
} from '@jest/globals';
import InputMapping from '../../src/rover/InputMapping';

describe('[InputMapping] Test the class functionality meets expectations', () => {

    /** @type {InputMapping} */
    let mapping;

    beforeEach(() => {
        mapping = new InputMapping();
    });

    /** Simple Class Validation */
    test('Can register and retrieve a handler', () => {
        mapping.mapCommand('TEST', () => true);
        expect(mapping.isMapped('TEST')).toBe(true);
        expect(mapping.getCommand('TEST')()).toBe(true);
    });

    /** Negative tests */

    test('When mapping command, key must be non-empty string', () => {
        expect(() => mapping.mapCommand('', () => {})).toThrow();
    });

    test('When mapping command, handler must be function', () => {
        expect(() => mapping.mapCommand('TEST', 32)).toThrow();
    });

    test('When retrieving command, key must be a non-empty string', () => {
        expect(() => mapping.getCommand('')).toThrow();
    });
});

