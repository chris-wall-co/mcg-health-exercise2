import {
    test,
    expect,
    describe,
    beforeEach
} from '@jest/globals';
import LinkedList from '../../src/linked-list/LinkedList';

/**
 * @typedef {object} Name 
 * @property {string} firstName
 * @property {string} lastName
*/

describe('[LinkedList] Tests that the class functionality operates as expected.', () => {

    /** @type {Array<Name>} */
    let useArray;

    /** @type {LinkedList<Name>} */
    let list;

    beforeAll(() => {
        useArray = [
            { firstName: 'John', lastName: 'Doe' },
            { firstName: 'James', lastName: 'Doe' },
            { firstName: 'Jane', lastName: 'Doe' },
            { firstName: 'William', lastName: 'Bite' },
        ];
    });

    beforeEach(() => {
        list = new LinkedList(useArray);
    })

    test('Should accept values and initialize the list correctly', () => {
        expect(list.list.length).toBe(4);
        expect(list.first().value.firstName).toBe('John');
        expect(list.last().value.firstName).toBe('William');
    });

    test('Last item should page forward to the beginning of the list', () => {
        expect(list.last().next().value.firstName).toBe('John');
    });

    test('First item should page back end of list', () => {
        expect(list.first().previous().value.firstName).toBe('William');
    })

    test('Find should return the correct value', () => {
        expect(list.find(n => n.firstName === 'Jane').value.firstName).toBe('Jane');
    });

    test('Get should return the item at the correct index', () => {
        expect(list.get(1).value.firstName).toBe('James');
    });

    /** NEGATIVE TESTS */
    test('Find should throw exception if not provided a function', () => {
        expect(() => list.find(null)).toThrow();
    });
    
});