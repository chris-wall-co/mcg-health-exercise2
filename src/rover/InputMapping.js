import MovementControl from './MovementControl';

/**
 * Command handler
 * @callback commandHandler
 * @param {MovementControl} processor - the command processor for the given {Rover}
 */

 /**
  * CommandMapping is responsible for mapping string command inputs to {CommandProcessor} actions
  * @class
  */
export default class CommandMapping {
    /**
     * Creates a new instance of the {CommandMapping} class.
     * @constructor
     */
    constructor() {
        /** 
         * @private
         * @type {Map<string, commandHandler>} 
         */
        this._map = new Map();
    }

    /**
     * Sets a handler for a given command string.  If the string is already registered, it will overwrite the existing handler.
     * @param {string} key - the key to use for this command
     * @param {commandHandler} handler - the function to handle the command
     * @returns {CommandMapping} - fluent interface
     */
    mapCommand(key, handler) {
        if (typeof key !== 'string' || key === '') {
            throw new Error('[CommandMapping] mapCommand expects argument "key" to be a non-empty string.');
        }

        if (typeof handler !== 'function') {
            throw new Error('[CommandMapping] mapCommand expects argument "handler" to be a function.');
        }

        this._map.set(key, handler);
        return this;
    }

    /**
     * Verifies whether or not a command string is already mapped.
     * @param {string} key - the command string to validate
     * @returns {boolean}
     */
    isMapped(key) {
        return (this._map.has(key) === true);
    }

    /**
     * Executes the mapped command against the supplied processor
     * @param {string} key - key for the desired command handler
     * @returns {commandHandler}
     */
    getCommand(key) {
        if (this.isMapped(key) !== true) {
            throw new Error('[CommandMapping] attempting to execute an unmapped command string.');
        }

        return this._map.get(key);
    }
}