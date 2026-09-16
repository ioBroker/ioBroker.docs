/**
 * Tests whether the given variable is a real object and not an Array
 *
 * @param it The variable to test
 */
export function isObject(it: unknown): it is Record<string, unknown> {
    // This is necessary because:
    // typeof null === 'object'
    // typeof [] === 'object'
    // [] instanceof Object === true
    return Object.prototype.toString.call(it) === '[object Object]';
}

/**
 * Tests whether the given variable is really an Array
 *
 * @param it The variable to test
 */
export function isArray(it: unknown): it is unknown[] {
    return Array.isArray(it);
}
