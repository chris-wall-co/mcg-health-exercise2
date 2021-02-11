/**
 * Postion class groups data points to identify a grid coordinate
 * @class
 */
export default class Position {
    /**
     * Creates a new instance of the {Position} class.
     * @constructor
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {

        if (isNaN(x) || typeof x !== 'number' || x < 0) {
            throw new Error('[Position] ctor expects argument "x" to be a non-negative whole number.');
        }

        if (isNaN(y) || typeof y !== 'number' || y < 0) {
            throw new Error('[Position] ctor expects argument "y" to be a non-negative whole number.');
        }

        /**
         * @private
         * @type {number}
         */
        this._x = Math.floor(x);

        /**
         * @private
         * @type {number}
         */
        this._y = Math.floor(y);
    }

    /**
     * x coordinate
     * @type {number}
     */
    get x() { return this._x; }

    /**
     * y coordinate
     * @type {number}
     */
    get y() { return this._y; }
}