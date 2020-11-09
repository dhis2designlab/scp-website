import { filter, components } from './actionTypes'
import Fuse from 'fuse.js'
import semver from 'semver'
import { findVerified, packageFromIndex } from '../helpers/packages'

export const searchComponents = () => (dispatch, getState) => {
    const filters = getState().filter
    const packages = getState().packages
    const { all } = getState().components

    const filteredList = applyFilters(all, filters, packages)
    const searchedList = search(filteredList, filters.searchTerm)

    dispatch({type: components.searchList, payload: searchedList})
}

export const setFilterAndSearch = (filters) => (dispatch, getState) => {
    dispatch({type: filter.setFilters, payload: filters})
    dispatch(searchComponents())
}

export const setDhis2VersionAndSearch = (filters) => (dispatch, getState) => {
    dispatch({type: filter.setFilters, payload: filters})
    dispatch(searchComponents())
}

export const setSearchTerm = (input) => (dispatch) => {
    dispatch({type: filter.setSearchTerm, payload: input})
}

export const setDisplayOffset = (displayOffset) => (dispatch) => {
    dispatch({type: filter.setDisplayOffset, payload: displayOffset})
}

/**
 * 
 * @param {array} list List to apply filters to
 * @param {object} filters The filters
 * @param {object} packages Top level object in redux store
 */
const applyFilters = (list, filters, packages) => {
    const { framework, dhis2Versions } = filters
    return list.filter(component => {
        // Filter on framework
        if(framework !== 'all'){
            if(component.language !== framework) return false
        }

        // Filter on verified
        if(filters.onlyVerified && !trueIfVerified(component, packages)) return false

        // Filter on dhis2 version
        if(dhis2Versions.length !== 0){
            for(let i = 0; i < dhis2Versions.length; i++){
                const index = component.dhis2Versions.indexOf(dhis2Versions[i])
                if(index === -1) return false
            }
        }

        return true
    })
}

/**
 * 
 * @param {object} component Item from components.all in redux store
 * @param {object} packages Top level object in redux store
 * @returns true if current package version is verified, false if not
 */
const trueIfVerified = (component, packages) => {
    const versionArray = findVerified(component, packages)
    if(!versionArray) return false
    const newestVersion = versionArray.sort(semver.rcompare)[0]
    const packageVersion = packageFromIndex(packages.currPackages, component.packageIndex).package.version
    if(packageVersion === newestVersion) return true
    else return false
}

/**
 * Searches an array using Fusejs
 * @param {array} list List to search on
 * @param {string} inputValue String to search with
 * @returns a result array with items matched
 */
const search = (list, inputValue) => {
    if(list.length === 0) return []
    if(inputValue.length === 0) return list.map(comp => ({item: comp}))

    const options = {
        includeScore: true,
        threshold: 0.4,
        keys: ['name']
    }
    const fuse = new Fuse(list, options)

    const result = fuse.search(inputValue)
    if(result === 0) return []
    return result
}