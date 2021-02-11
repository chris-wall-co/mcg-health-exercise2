/**
 * @typedef {object} RoverData
 * @property {number} startX - starting X coordinate
 * @property {number} startY - starting Y coordinate
 * @property {string} startDir - starting direction
 * @property {string} commands - command string to execute
 */

/**
 * Parser to convert a string of raw user input into usable object data.
 * @class
 */
export default class RoverParser {

    /**
     * Parses a string of rover data into usable object data.
     * @param {string} line - line of user input
     * @returns {RoverData}
     */
    parse(line) {
        if (typeof line !== 'string' || line === '') {
            throw new Error('[RoverParser] ctor expects the argument "line" to be a non-empty string.');
        }

        const roverData = line.trim().split(' ');

        if (roverData.length < 4) {
            throw new Error('[RoverParser] rover input data is missing required segments');
        }

        const startX = parseInt(roverData[0]);
        const startY = parseInt(roverData[1]);
        const startDir = roverData[2];
        const commands = roverData[3];

        if (isNaN(startX) || isNaN(startY)) {
            throw new Error('[RoverParser] expected segments 1 and 2 of the input line to be numeric data');
        }

        if (typeof commands !== 'string' || commands === '') {
            throw new Error('[RoverParser] expected command input to be a non-empty string');
        }

        return Object.freeze({ startX, startY, startDir, commands });
    }
}
