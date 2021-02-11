import LinkedListItem from '../linked-list/LinkedListItem';
import Heading from '../positional/Heading';
import Position from '../positional/Position';
import CommandProcessor from './CommandProcessor';
import MovementControl from './MovementControl';
import Grid from '../positional/Grid';


/**
 * Rover class represents the rover to be controlled.
 * @class
 */
export default class Rover {
    /**
     * Creates a new instance of the {Rover} class.
     * @constructor
     * @param {CommandProcessor} commandModule - the command module for this Rover
     */
    constructor(commandModule) {
        /**
         * @private
         * @type {CommandProcessor}
         */
        this._commandModule = commandModule;

        /**
         * @private
         * @type {boolean}
         */
        this._hasLanded = false;

        /**
         * @private
         * @type {import('./MovementControl').ReportedPosition}
         */
        this._location = null;
    }

    /**
     * Gets a flag that indicates if this Rover has landed and is available for input.
     * @type {boolean}
     */
    get hasLanded() {
        return this._hasLanded === true;
    }

    /**
     * Gets the current location of the {Rover}
     * @type {import('./MovementControl').ReportedPosition}
     */
    get position() {
        return this._location;
    }

    /**
     * Lands the rover at the given coordinates and heading
     * @param {Grid} zone - the landing zone
     * @param {number} startX - starting X coordinate
     * @param {number} startY - starting Y coordinate
     * @param {LinkedListItem<Heading>} heading - starting direction
     */
    land(zone, startX, startY, heading) {
        const mc = new MovementControl(zone, new Position(startX, startY), heading);
        this._location = this._commandModule.engage(mc);
        this._hasLanded = true;
        return this.position;
    }

    /**
     * Process a command string to control the {Rover}
     * @param {string} commands - a string of commands
     * @returns {import('./MovementControl').ReportedPosition}
     */
    processCommands(commands) {
        if (this.hasLanded !== true) {
            throw new Error('[Rover] cannot command a rover that has not yet landed.');
        }

        if (typeof commands !== 'string' || commands.length < 1) {
            throw new Error('[Rover] processCommands expected argument "commands" to be a non-empty string.');
        }

        this._location = Object.freeze(commands.trim().split('').reduce((loc, cmd) => this._commandModule.execute(cmd), {}));
        return this.position;
    }  
}