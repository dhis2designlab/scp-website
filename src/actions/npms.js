import axios from 'axios'
import { packages, query, filter, components } from './actionTypes'
import { npms, unpkg } from '../app/config'
import qs from 'qs'
import Fuse from 'fuse.js'

/**
 * Simple method for fetching a set of packages from npms and then dispatching them to get stored in the Redux store.
 */
export const getPackages = (inputValue) => async (dispatch, getState) => {
    const {modifiers, offset} = getState().query

    const searchString = queryBuilder(inputValue, modifiers)

    const response = await axios.get(npms.baseUrl, { 
        params: { 
            q: searchString,
            from: offset

        },
        paramsSerializer: params => {
            return qs.stringify(params, {encode: false})
        }
    })

    const promiseArray = []

    for(let i = 0; i < response.data.results.length; i++){
        const packageData = response.data.results[i]
        promiseArray.push(getPackageJSON(`${packageData.package.name}@${packageData.package.version}/package.json`))
    }

    const unpkgResults = await Promise.all(promiseArray)

    for(let i = 0; i < unpkgResults.length; i++){
        response.data.results[i].packageJSON = {
            ...unpkgResults[i],
            // Placeholder to test searching on
            dhis2components: ['name', 'name2', 'name3', 'name4']
        }
    }

    const componentList = []

    for(let i = 0; i < response.data.results.length; i++){
        const pack = response.data.results[i]
        const packJsonComps = pack.packageJSON.dhis2components
        for(let j = 0; j < packJsonComps.length; j++){
            const comp = {
                name: packJsonComps[j],
                packageIndex: i
            }
            componentList.push(comp)
        }
    }
    console.log(componentList)

    const searchedList = search(componentList, inputValue)
    
    dispatch({ type: components.createList, payload: componentList})
    dispatch({ type: components.searchList, payload: searchedList})
    dispatch({ type: packages.fetchPackages, payload: {data: response.data, offset: offset}})
}

export const setModifiers = (mods) => (dispatch) => {
    dispatch({type: query.setModifiers, payload: mods})
}

export const setSearchTerm = (input) => (dispatch) => {
    dispatch({type: query.setSearchTerm, payload: input})
}

export const setOffset = (offset) => (dispatch) => {
    dispatch({type: query.setOffset, payload: offset})
}

export const setVerified = (verified) => (dispatch) => {
    dispatch({type: filter.setVerified, payload: verified})
}

export const setDisplayOffset = (displayOffset) => (dispatch) => {
    dispatch({type: filter.setDisplayOffset, payload: displayOffset})
}

const queryBuilder = (inputValue, mod) => {
    var input = inputValue
    if (input === '' && mod.length < 1) {
        return null; //Empty search
    }
    if (mod.length > 0) {
        var appendix = mod.join('+')
        appendix = '+' + mod;
        input += appendix
    }
    return input
}

const getPackageJSON = async (input) => {
    const response = await axios.get(`${unpkg.baseUrl}/${input}`)
    return response.data
}

const search = (list, inputValue) => {
    const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: ['name']
    }
    const fuse = new Fuse(list, options)

    const result = fuse.search(inputValue)
    console.log(result)
    if(result == 0) return []
    return result
}