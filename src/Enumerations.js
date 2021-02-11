
/**
 * HEADING enumerates the acceptable values
 * @enum
 * @readonly
 */
export const HEADING = Object.freeze({
    EAST: 'E',
    NORTH: 'N',
    SOUTH: 'S',
    WEST: 'W',
});

/**
 * COMMANDS enumerates the acceptable command values.
 * @enum
 * @readonly
 */
export const COMMANDS = Object.freeze({
    TURN_LEFT: 'L',
    MOVE_FORWARD: 'M',
    TURN_RIGHT: 'R',
});

/**
 * AXIS enumerates the acceptable axis values.
 * @enum
 * @readonly
 */
export const AXIS = Object.freeze({
    X: 'x',
    Y: 'y',
});

/**
 * ADJUSTMENT enumerates the acceptable values for positional adjustments.
 * @enum
 * @readonly
 */
export const ADJUSTMENT = Object.freeze({
    BACKWARD: -1,
    FORWARD: 1,
});

export const DISPOSITION = Object.freeze({
    TRANSIENT: 'transient',
    SINGLETON: 'singleton',
});

/**
 * isValueInEnum verifies that a supplied value exists in an enumeration exactly as provided.
 * @param {Object} enumeration - the enumeration to search
 * @param {*} value - the value to search for
 * @returns {boolean} 
 */
export function isValueInEnum(enumeration, value) {
    return (Object.keys(enumeration).some(k => enumeration[k] === value) === true);
}