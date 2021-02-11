import {
    test,
    expect,
    describe,
    beforeEach
} from '@jest/globals';
import Grid from '../../src/positional/Grid';
import Position from '../../src/positional/Position';
import MovementControl from '../../src/rover/MovementControl';
import CommandProcessor from '../../src/rover/CommandProcessor';
import LinkedList from '../../src/linked-list/LinkedList';
import Heading from '../../src/positional/Heading';
import Adjustment from '../../src/positional/Adjustment';
import InputMapping from '../../src/rover/InputMapping';
import { HEADING, ADJUSTMENT, AXIS } from '../../src/Enumerations';


describe('[CommandProcessor] Test the class functionality meets expectations', () => {

    /** @type {CommandProcessor} */
    let proc;

    /** @type {MovementControl} */
    let movectrl;

    /** @type {LinkedList<Heading>} */
    const headings = new LinkedList([
        new Heading(HEADING.NORTH, new Adjustment(AXIS.Y, ADJUSTMENT.FORWARD)),
        new Heading(HEADING.EAST, new Adjustment(AXIS.X, ADJUSTMENT.FORWARD)),
        new Heading(HEADING.SOUTH, new Adjustment(AXIS.Y, ADJUSTMENT.BACKWARD)),
        new Heading(HEADING.WEST, new Adjustment(AXIS.X, ADJUSTMENT.BACKWARD)),
    ]);

    beforeEach(() => {
        movectrl = new MovementControl(new Grid(5, 5), new Position(1, 2), headings.get(0));
        proc = new CommandProcessor((new InputMapping()).mapCommand('TEST', (mover) => mover === movectrl));
    });

    /** Simple Class Validation */
    test('Should be able to engate movement control', () => {
        proc.engage(movectrl);
        expect(proc._mover).toBe(movectrl);
    });

    test('Should execute a mapped command', () => {
        proc.engage(movectrl);
        const r = proc.execute('TEST');
        expect(r).toBe(true);
    });

    /** Negative tests */

    test('Command string must be a mapped key', () => {
        proc.engage(movectrl);
        expect(() => proc.execute('blah')).toThrow();
    });

    test('Must be engaged before issuing commands', () => {
        expect(() => proc.execute('TEST')).toThrow();
    });
});

