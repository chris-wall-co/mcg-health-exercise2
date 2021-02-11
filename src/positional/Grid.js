/**
 * Grid represents the bounding box for the Rover to operate within
 * @class
 */
export default class Grid {

    /**
     * Creates a new instance of the {Grid} class.
     * @constructor
     * @param {number} height - the maximum Y coordinate
     * @param {number} width - the maximum X coordinate
     */
    constructor(height, width) {

        if (isNaN(height) || typeof height !== 'number' || height < 1) {
            throw new Error('[Grid] ctor expected argument "height" to be a number greater than zero.');
        }

        if (isNaN(width) || typeof width !== 'number' || width < 1) {
            throw new Error('[Grid] ctor expected argument "width" to be a number greater than zero.');
        }
        
        /**
         * @private
         * @type {number}
         */
        this._height = height;

        /**
         * @private
         * @type {number}
         */
        this._width = width;
    }

    /**
     * height represents the maximum Y coordinate value
     * @type {number}
     */
    get height() { return this._height; }

    /**
     * width represents the maximum X coordinate value
     * @type {number}
     */
    get width() { return this._width; }

    /**
     * isInBounds determins if a given x,y position is within the bounds of the {Grid}
     * @param {number} x - horizontal axis position
     * @param {number} y - vertical axis position
     * @returns {boolean}
     */
    isInBounds(x, y) {
        return (x >= 0 && x <= this.width && y >= 0 && y <= this.height);
    }
}