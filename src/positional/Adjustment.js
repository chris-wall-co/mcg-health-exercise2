import {
    isValueInEnum,
    AXIS
} from '../Enumerations';

export default class Adjustment {
    /**
     * Creates a new instance of the {Adjustment} class.
     * @param {string} axis - axis of positional movement
     * @param {number} amount - amount of positional adjustment along axis
     */
    constructor(axis, amount) {
        if (typeof axis !== 'string' || isValueInEnum(AXIS, axis.toLowerCase()) !== true) {
            throw new Error('[Heading] ctor expected argument "axis" to be a valid positional axis.');
        }

        if (typeof amount !== 'number') {
            throw new Error('[Heading] ctor expected argument "amount" to be a whole number');
        }

        /**
         * @private
         * @type {string}
         */
        this._axis = axis.toLowerCase();

        /** 
         * @private 
         * @type {number}
         */
        this._amount = Math.floor(amount);
    }

    /**
     * Axis along which this adjustment directs movement.
     * @type {string}
     */
    get axis() { return this._axis; }

    /**
     * Amount of positional adjustment along the given axis
     * @type {number}
     */
    get amount() { return this._amount; }
}