/**
 * Finds the verified array for a component
 * @param {object} component Item from components.all in redux store
 * @param {object} packages Top level object in redux store
 * @returns versionArray if found, otherwise null
 */
export const findVerified = (component, packages) => {
    const pack = packages.currPackages[component.packageIndex]
    if(!pack) return null
    const versionArray = packages.verified[pack.package.name]
    if(!versionArray) return null
    return versionArray
}

/**
 * Finds a package from its index
 * @param {object} packages Top level object in redux store
 * @param {index} index A component's packageIndex
 * @returns {object} The package
 */
export const packageFromIndex = (packages, index) => {
    return packages[index]
}