import {
    test,
    expect,
    describe,
    beforeEach
} from '@jest/globals'; 
import Rover from '../../src/rover/Rover';
import Grid from '../../src/positional/Grid';
import CommandProcessor from '../../src/rover/CommandProcessor';
import LinkedList from '../../src/linked-list/LinkedList';
import Heading from '../../src/positional/Heading';
import Adjustment from '../../src/positional/Adjustment';
import InputMapping from '../../src/rover/InputMapping';
import { HEADING, ADJUSTMENT, AXIS, COMMANDS } from '../../src/Enumerations';

describe('[Rover] Test the class functionality meets expectations', () => {

    /** @type {Rover} */
    let rover;

    /** @type {LinkedList<Heading>} */
    const headings = new LinkedList([
        new Heading(HEADING.NORTH, new Adjustment(AXIS.Y, ADJUSTMENT.FORWARD)),
        new Heading(HEADING.EAST, new Adjustment(AXIS.X, ADJUSTMENT.FORWARD)),
        new Heading(HEADING.SOUTH, new Adjustment(AXIS.Y, ADJUSTMENT.BACKWARD)),
        new Heading(HEADING.WEST, new Adjustment(AXIS.X, ADJUSTMENT.BACKWARD)),
    ]);

    /** @type {InputMapping} */
    const mapping = Object.freeze((new InputMapping())
        .mapCommand(COMMANDS.MOVE_FORWARD, proc => proc.move())
        .mapCommand(COMMANDS.TURN_LEFT, proc => proc.turnLeft())
        .mapCommand(COMMANDS.TURN_RIGHT, proc => proc.turnRight())
    );

    beforeEach(() => {
        const proc = new CommandProcessor(mapping);
        rover = new Rover(proc);
    });

    /** Simple Class Validation */
    test('Able to land the Rover in the correct location', () => {
        expect(rover.hasLanded).toBe(false);

        rover.land(new Grid(5,5), 1, 2, headings.get(0));
        expect(rover.position.x).toBe(1);
        expect(rover.position.y).toBe(2);
        expect(rover.position.dir).toBe('N');
        expect(rover.hasLanded).toBe(true);
    });

    test('Able to process multi-command string', () => {
        rover.land(new Grid(5,5), 1, 2, headings.get(0));
        rover.processCommands('RMRMLLMLMR');
        expect(rover.position.x).toBe(1);
        expect(rover.position.y).toBe(2);
        expect(rover.position.dir).toBe('N');
    });

    /** Negative tests */

    test('Must land the rover before issuing commands', () => {
        expect(() => rover.processCommands('LLLLLLL')).toThrow();
    });

    test('Must supply processCommands with a non-empty string', () => {
        expect(() => rover.processCommands('')).toThrow();
        expect(() => rover.processCommands(3)).toThrow();
    });
});

