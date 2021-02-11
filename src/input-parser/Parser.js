import {
    EOL
} from 'os';
import PlateauParser from './PlateauParser';
import RoverParser from './RoverParser';

/**
 * @typedef {object} ParserResults
 * @property {import('./PlateauParser').PlateauData} plateau - the plateau size data
 * @property {Array<import('./RoverParser').RoverData>} rovers - the list of rover movement data
 */

/**
 * Parses the user input into usable object data.
 * @class
 */
export default class Parser {
    /**
     * Creates a new instance of the {Parser} class.
     * @constructor
     */
    constructor() {
        /**
         * @private
         * @type {PlateauParser}
         */
        this._plateauParser = new PlateauParser();

        /**
         * @private
         * @type {RoverParser}
         */
        this._roverParser = new RoverParser();
    }

    /**
     * Parses the raw string input into usable objects.
     * @param {string} inputs - string input block
     * @returns {ParserResults}
     */
    parseInputs(inputs) {
        if (typeof inputs !== 'string' || inputs === '') {
            throw new Error('[Parser] parseInputs expects argument "inputs" to be a non-empty string.');
        }

        const lines = inputs.trim().split(EOL);

        if (lines.length < 3) {
            throw new Error('[Parser] parseInputs was not provided enough lines to correctly parse out the object data.');
        }

        const plateau = this._plateauParser.parse(lines[0].trim());
        const rovers = [];

        for (let r = 1; r < lines.length; r++) {
            if (r === (lines.length - 1)) {
                throw new Error('[Parser] parseInputs received an incomplete set of Rover data that cannot be parsed.');
            }
            
            rovers.push(this._roverParser.parse(`${lines[r].trim()} ${lines[++r].trim()}`));
        }

        return Object.freeze({ plateau, rovers });
    }
}