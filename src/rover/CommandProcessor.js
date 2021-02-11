import InputMapping from './InputMapping';
import MovementControl from './MovementControl';

/**
 * Dispatches commands and allows the Rover to communicate with subsystems.
 * @class
 */
export default class CommandProcessor {
    /**
     * Creates a new instance of the {CommandProcessor} class.
     * @param {InputMapping} mapping - the input mapping configuration
     */
    constructor(mapping) {
        /**
         * @private
         * @type {InputMapping}
         */
        this._mapping = mapping;

        /**
         * @private
         * @type {MovementControl}
         */
        this._mover = null;
    }

    /**
     * Engages the Rover's movement control to be commanded.
     * @param {MovementControl} mover - the attached Rover's movement controller
     * @returns {import('./MovementControl').ReportedPosition}
     */
    engage(mover) {
        this._mover = mover;
        return this._mover.location;
    }

    /**
     * Process a single command value to control the {Rover}
     * @param {string} command - the command string
     * @returns {*}
     */
    execute(command) {
        if (typeof command !== 'string' || this._mapping.isMapped(command) !== true) {
            throw new Error('[CommandProcessor] attempting to execute an unrecognized command.');
        }

        if (typeof this._mover !== 'object' || this._mover === null) {
            throw new Error('[CommandProcessor] attempting to command the Rover before engaging the movement controller.');
        }

        const fn = this._mapping.getCommand(command);
        return fn(this._mover);
    }
}
