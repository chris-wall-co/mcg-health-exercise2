// DEV NOTE:
// JS does not have a native linked list like some languages, but it's the 
// perfect structure for our implementation so we're recreating a simple one.
// Only implementing the features we need as this is just an exercise.

import LinkedListItem from './LinkedListItem'; 

/**
 * Search predicate
 * @callback searchPredicate
 * @param {T} value - the underlying item value
 * @returns {boolean}
 * @template T
 */

/**
 * LinkedList is like an array that tracks position within itself.
 * @class
 * @template T
 */
export default class LinkedList {
    /**
     * Creates a new instance of the {LinkedList} class.
     * @constructor
     * @param {Array<T>} arr - array of values to initialize the list
     */
    constructor(arr) {
        /** 
         * @private
         * @type {Array<LinkedListItem<T>>} 
         */
        this._internal = Object.freeze(arr.map((i, idx) => {
            const pidx = ((idx - 1) >= 0 ? (idx - 1) : (arr.length - 1));
            const nidx = ((idx + 1) < arr.length ? (idx + 1) : 0);
            return new LinkedListItem(i, this, pidx, nidx);
        }));
    }

    /**
     * Get the internal list
     * @type {Array<LinkedListItem<T>>}
     */
    get list() { return this._internal; }

    /**
     * Searches the items in the list for one that satisfies the predicate and selects it.
     * @param {searchPredicate<T>} predicate - search function
     * @returns {LinkedListItem<T>}
     */
    find(predicate) {
        if (typeof predicate !== 'function') {
            throw new Error('[LinkedList] find expected argument "predicate" to be a function.');
        }
        
        return this.list.find(i => predicate(i.value) === true);
    }

    /**
     * Select item by index
     * @param {number} index - requested index
     * @returns {LinkedListItem<T>}
     */
    get(index) {
        return this._internal[index];
    }

    /**
     * Select the first item in the list
     * @returns {LinkedListItem<T>}
     */
    first() {
        return this._internal[0];
    }

    /**
     * Select the last item in the list
     * @returns {LinkedListItem<T>}
     */
    last() {
        return this._internal[this.list.length - 1];
    }
}