import { 
    ADJUSTMENT, 
    AXIS, 
    COMMANDS, 
    HEADING 
} from './Enumerations';
import {
    EOL
} from 'os';
import Adjustment from './positional/Adjustment';
import Grid from './positional/Grid';
import Heading from './positional/Heading';
import InputMapping from './rover/InputMapping';
import Rover from './rover/Rover';
import CommandProcessor from './rover/CommandProcessor';
import Parser from './input-parser/Parser';
import LinkedList from './linked-list/LinkedList';

/**
 * The problem solution represented as a class.
 * @class
 */
export default class Solution {
    /**
     * Creates a new instance of the {Solution} class.
     * @constructor
     */
    constructor() {

        /** 
         * @private 
         * @type {LinkedList<Heading>}
         */
        this._headings = new LinkedList([
            new Heading(HEADING.NORTH, new Adjustment(AXIS.Y, ADJUSTMENT.FORWARD)),
            new Heading(HEADING.EAST, new Adjustment(AXIS.X, ADJUSTMENT.FORWARD)),
            new Heading(HEADING.SOUTH, new Adjustment(AXIS.Y, ADJUSTMENT.BACKWARD)),
            new Heading(HEADING.WEST, new Adjustment(AXIS.X, ADJUSTMENT.BACKWARD)),
        ]);

        /** 
         * @private 
         * @type {CommandMapping}
         */
        this._mapping = Object.freeze((new InputMapping())
            .mapCommand(COMMANDS.MOVE_FORWARD, proc => proc.move())
            .mapCommand(COMMANDS.TURN_LEFT, proc => proc.turnLeft())
            .mapCommand(COMMANDS.TURN_RIGHT, proc => proc.turnRight())
        );
    }

    /**
     * Receives user input and processes the command structure
     * @param {string} inputs - string of raw user input
     * @returns {string}
     */
    receiveInputBlock(inputs) {
        const parser = new Parser();
        const results = parser.parseInputs(inputs.trim());
        const plateau = new Grid(results.plateau.maxY, results.plateau.maxX);
        const roverEnds = results.rovers.map(cfg => {
            const rvr = new Rover(new CommandProcessor(this._mapping));
            rvr.land(plateau, cfg.startX, cfg.startY, this._headings.find(h => h.direction === cfg.startDir));
            rvr.processCommands(cfg.commands);
            return rvr.position.toString();
        });

        return roverEnds.join(EOL);
    }
}