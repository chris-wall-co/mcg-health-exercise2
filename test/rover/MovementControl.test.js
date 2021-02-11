import {
    test,
    expect,
    describe,
    beforeEach
} from '@jest/globals';
import Grid from '../../src/positional/Grid';
import Position from '../../src/positional/Position';
import MovementControl from '../../src/rover/MovementControl';
import LinkedList from '../../src/linked-list/LinkedList';
import Heading from '../../src/positional/Heading';
import Adjustment from '../../src/positional/Adjustment';
import { HEADING, ADJUSTMENT, AXIS } from '../../src/Enumerations';

describe('[MovementControl] Test the class functionality meets expectations', () => {

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
    });

    /** Simple Class Validation */
    test('Initial position is correct', () => {
        expect(movectrl.location.x).toBe(1);
        expect(movectrl.location.y).toBe(2);
        expect(movectrl.location.dir).toBe('N');
    });

    test('Can turn left', () => {
        const pos = movectrl.turnLeft();
        expect(pos.x).toBe(1);
        expect(pos.y).toBe(2);
        expect(pos.dir).toBe('W');
    });

    test('Can turn right', () => {
        const pos = movectrl.turnRight();
        expect(pos.x).toBe(1);
        expect(pos.y).toBe(2);
        expect(pos.dir).toBe('E');
    });

    test('Can move on X axis', () => {
        movectrl.turnRight(); // Face east
        movectrl.move();
        expect(movectrl.location.x).toBe(2);
        expect(movectrl.location.y).toBe(2);
        expect(movectrl.location.dir).toBe('E');
        
        movectrl.turnLeft(); // Face north
        movectrl.turnLeft(); // Face west
        movectrl.move();
        expect(movectrl.location.x).toBe(1);
        expect(movectrl.location.y).toBe(2);
        expect(movectrl.location.dir).toBe('W');
    });

    test('Can move on Y axis', () => {
        movectrl.move();
        expect(movectrl.location.x).toBe(1);
        expect(movectrl.location.y).toBe(3);
        expect(movectrl.location.dir).toBe('N');
        
        movectrl.turnLeft(); // Face west
        movectrl.turnLeft(); // Face south
        movectrl.move();
        expect(movectrl.location.x).toBe(1);
        expect(movectrl.location.y).toBe(2);
        expect(movectrl.location.dir).toBe('S');
    });

    /** Negative tests */

    test('Initial position must be within the bounds of the exploration zone', () => {
        expect(() => new MovementControl(new Grid(5, 5), new Position(6, 2), headings.get(0))).toThrow();
        expect(() => new MovementControl(new Grid(5, 5), new Position(2, 6), headings.get(0))).toThrow();
    });
});

