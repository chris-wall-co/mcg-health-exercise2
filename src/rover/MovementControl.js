import Position from '../positional/Position';
import Grid from '../positional/Grid';
import LinkedListItem from '../linked-list/LinkedListItem';
import Heading from '../positional/Heading';

/**
 * @typedef {Object} ReportedPosition
 * @property {number} x - the x axis position
 * @property {number} y - the y axis position
 * @property {string} dir - the cardinal direction the rover is facing
 * @property {Function} toString - returns a string representation of the position
 */

/**
 * Tracks and adjusts the Rover's position along the grid.
 * @class
 */
export default class MovementControl {
    /**
     * Creates a new instance of the {CommandProcessor} class.
     * @param {Grid} area - the bounding rectangle for the Rover's exploration area
     * @param {Position} initialPosition - the origination point for the Rover
     * @param {LinkedListItem<Heading>} initialHeading - the initial heading
     */
    constructor(area, initialPosition, initialHeading) {
        if (initialPosition.x > area.width) {
            throw new Error('[MovementControl] you have crashed the Rover outside the vertical bounds of the exploration zone!');
        }

        if (initialPosition.y > area.height) {
            throw new Error('[MovementControl] you have crashed the Rover outside the horizontal bounds of the exploration zone!');
        }

        /**
         * @private
         * @type {Grid}
         */
        this._area = area;

        /**
         * @private
         * @type {LinkedListItem<Heading>}
         */
        this._currentHeading = initialHeading;

        /**
         * @private
         * @type {Position}
         */
        this._currentPosition = initialPosition;
    }

    /**
     * Gets the current location of the Rover
     * @type {ReportedPosition}
     */
    get location() {
        return Object.freeze({ 
            x: this._currentPosition.x, 
            y: this._currentPosition.y, 
            dir: this._currentHeading.value.direction,
            toString: () => `${this._currentPosition.x} ${this._currentPosition.y} ${this._currentHeading.value.direction}`,
        });
    }

    /**
     * Turn the Rover to face to the left of current direction.
     * @returns {ReportedPosition}
     */
    turnLeft() {
        const newHeading = this._currentHeading.previous();
        this._currentHeading = newHeading;
        return this.location;
    }

    /**
     * Turns the Rover to face to the right of current direction.
     * @returns {ReportedPosition}
     */
    turnRight() {
        const newHeading = this._currentHeading.next();
        this._currentHeading = newHeading;
        return this.location;
    }

    /**
     * Moves the Rover along it's current heading
     * @returns {ReportedPosition}
     */
    move() {
        const xy = this._currentHeading.value.adjustments.reduce((pos, adj) => {
            const newpos = ({...pos, [adj.axis]: (pos[adj.axis] + adj.amount)});
            if (newpos.x > this._area.width || newpos.y > this._area.height) {
                throw new Error('[MovementControl] movement along this heading will result in the Rover leaving the bounds of the exploration area.');
            }

            return newpos;
        }, { x: this._currentPosition.x, y: this._currentPosition.y });

        this._currentPosition = new Position(xy.x, xy.y);

        return this.location;
    }
}