import { 
    HEADING, 
    isValueInEnum 
} from "../Enumerations";
import Adjustment from "./Adjustment";

/**
 * Heading contains the pertinent details of the Rover's heading and how it affects movement.
 * @class
 */
export default class Heading {
    /**
     * Creates a new instance of the {Heading} class.
     * @param {string} dir - cardinal direction abbreviation (e.g. 'N', 'S', etc.)
     * @param {...Adjustment} adjustments - list of adjustments when moving along this heading
     */
    constructor(dir, ...adjustments) {

        if (typeof dir !== 'string' || isValueInEnum(HEADING, dir.toUpperCase()) !== true) {
            throw new Error('[Heading] ctor expected argument "dir" to be a valid cardinal direction abbreviation.');
        }

        // -- this creates a strong typing, maybe refactor to allow duck typing (outside the scope of a simple exercise)
        if (Array.isArray(adjustments) !== true || adjustments.length < 1 || adjustments.every(a => a instanceof Adjustment) !== true) {
            throw new Error('[Heading] ctor expected argument "adjustments" to be an array of valid adjustment objects.');
        }

        /**
         * @private
         * @type {string}
         */
        this._abbr = dir.toUpperCase();

        /**
         * @private
         * @type {Array<Adjustment>}
         */
        this._adjustments = adjustments;
    }

    /**
     * Cardinal direction abbreviation for this heading.
     * @type {string}
     */
    get direction() { return this._abbr; }

    /**
     * Positional adjustments made when moving along this heading. 
     * @type {Array<Adjustment>} 
     */
    get adjustments() { return this._adjustments; }
}