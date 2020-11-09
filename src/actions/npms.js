import axios from 'axios'
import { packages, query, filter, components } from './actionTypes'
import { npmRegistry, unpkg } from '../app/config'
import { searchComponents } from './filters'

/**
 * Simple method for fetching a set of packages from npms and then dispatching them to get stored in the Redux store.
 */
export const getPackages = () => async (dispatch, getState) => {
    const { modifiers, offset } = getState().query

    const searchString = queryBuilder(modifiers)

    const response = await axios.get(npmRegistry.baseUrl, { 
        params: { 
            text: searchString,
        },
    })

    const promiseArray = []

    for(let i = 0; i < response.data.objects.length; i++){
        const packageData = response.data.objects[i]
        promiseArray.push(getPackageJSON(`${packageData.package.name}@${packageData.package.version}/package.json`))
    }

    const unpkgResults = await Promise.all(promiseArray).catch(e => console.log(e))

    for(let i = 0; i < unpkgResults.length; i++){
        response.data.objects[i].packageJSON = {
            ...unpkgResults[i],
        }
    }

    const componentList = []
    const allDhis2Versions = []
    const dhis2VersionsById = {}

    for(let i = 0; i < response.data.objects.length; i++){
        const pack = response.data.objects[i]
        const packJsonComps = pack.packageJSON.dhis2ComponentSearch.components
        for(let j = 0; j < packJsonComps.length; j++){
            const comp = {
                name: packJsonComps[j].name,
                export: packJsonComps[j].export,
                description: packJsonComps[j].description,
                language: pack.packageJSON.dhis2ComponentSearch.language,
                dhis2Versions: packJsonComps[j].dhis2Version,
                packageIndex: i
            }
            componentList.push(comp)
            if(comp.dhis2Versions){
                for(let k = 0; k < comp.dhis2Versions.length; k++){
                    if(allDhis2Versions.indexOf(comp.dhis2Versions[k]) === -1) {
                        allDhis2Versions.push(comp.dhis2Versions[k])
                        dhis2VersionsById[comp.dhis2Versions[k]] = 1
                    }
                    else {
                        dhis2VersionsById[comp.dhis2Versions[k]] += 1
                    }
                }
            }
        }
    }
    
    dispatch({ type: packages.createDhis2VersionArray, payload: { versionArray: allDhis2Versions, versionObject: dhis2VersionsById}})
    dispatch({ type: components.createList, payload: componentList})
    dispatch({ type: packages.fetchPackages, payload: {data: response.data, offset: offset}})
    dispatch(searchComponents())
}

export const setModifiers = (mods) => (dispatch) => {
    dispatch({type: query.setModifiers, payload: mods})
}

export const setOffset = (offset) => (dispatch) => {
    dispatch({type: query.setOffset, payload: offset})
}

export const setVerified = (verified) => (dispatch) => {
    dispatch({type: filter.setVerified, payload: verified})
}

const queryBuilder = (mod) => {
    var query = ''
    if (mod.length > 0) {
        var appendix = mod.join('+')
        query += appendix
    }
    return query
}

const getPackageJSON = async (input) => {
    const response = await axios.get(`${unpkg.baseUrl}/${input}`)
    return response.data
}