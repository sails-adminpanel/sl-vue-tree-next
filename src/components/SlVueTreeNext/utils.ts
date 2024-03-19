/**
 * Function to deeply merge two objects
 * Keeps keys from source if they don't exist in target. Otherwise, it overwrites the target value with the source value.
 * @param target The target object
 * @param source The source object
 * @returns The merged object
 */
export const deepMerge = (target: any, source: any) => {
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} })
                }
                deepMerge(target[key], source[key])
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }

    return target
}

/**
 * Function to check if a value is an object
 * @param item The value to check
 * @returns Whether the value is an object
 */
export const isObject = (item: any) => {
    return item && typeof item === 'object' && !Array.isArray(item)
}
