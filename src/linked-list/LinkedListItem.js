/**
 * LinkedListItem is a list-aware single item housed by a linked list
 * @class
 * @template T
 */
export default class LinkedListItem {

    /**
     * Creates a new instance of the {LinkedListItem} class.
     * @constructor
     * @param {T} data - the value to store in this item
     * @param {LinkedList<T>} list - the list that owns this item
     * @param {LinkedListItem<T>} previous - the item preceding this one in the list
     * @param {LinkedListItem<T>} next - the item after this one in the list
     */
    constructor(data, list, previousIndex, nextIndex) {

        /**
         * @private
         * @type {T}
         */
        this._data = data;

        /**
         * @private
         * @type {LinkedList<T>}
         */
        this._list = list;

        /**
         * @private
         * @type {LinkedListItem<T>}
         */
        this._next = nextIndex;

        /**
         * @private
         * @type {LinkedListItem<T>}
         */
        this._previous = previousIndex;
    }

    /** 
     * Gets the internal value of the item
     * @type {T}
     */
    get value() { return this._data; }

    /**
     * next gets the next {LinkedListItem} from the ownning list
     * @returns {LinkedListItem<T>}
     */
    next() {
        return this._list.get(this._next);
    }

    /**
     * previous gets the previous {LinkedListItem} from the owning list
     * @returns {LinkedListItem<T>}
     */
    previous() {
        return this._list.get(this._previous);
    }
}