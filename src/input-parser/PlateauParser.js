/**
 * @typedef {object} PlateauData
 * @property {number} maxX - top right X coordinate
 * @property {number} maxY - top right Y coordinate
 */

/**
 * Parser for Plateau input data.
 * @class
 */
export default class PlateauParser {

    /**
     * Parses the user input into usable object data.
     * @param {string} line - user input line
     * @returns {PlateauData}
     */
    parse(line) {
        if (typeof line !== 'string' || line === '') {
            throw new Error('[PlateauData] getGrid expects the argument "line" to be a non-empty string.');
        }

        const gridSize = line.split(' ');
        const maxX = parseInt(gridSize[0]);
        const maxY = parseInt(gridSize[1]);

        if (isNaN(maxX) || isNaN(maxY)) {
            throw new Error('[PlateauData] supplied plateau size has invalid (non-numeric) arguments.');
        }

        return Object.freeze({ maxX, maxY });
    }
}