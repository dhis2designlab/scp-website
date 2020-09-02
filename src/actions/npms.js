import axios from 'axios'
import { packages, query } from './actionTypes'
import { npms } from '../app/config'
import qs from 'qs'

/**
 * Simple method for fetching a set of packages from npms and then dispatching them to get stored in the Redux store.
 */
export const getPackages = (inputValue) => async (dispatch, getState) => {
    const {modifiers} = getState().query

    const searchString = queryBuilder(inputValue, modifiers)

    const response = await axios.get(npms.baseUrl, { 
        params: { 
            q: searchString,
        },
        paramsSerializer: params => {
            return qs.stringify(params, {encode: false})
        }
    })
    dispatch({ type: packages.fetchPackages, payload: response.data})
}

export const setModifiers = (mods) => (dispatch) => {
    dispatch({type: query.setModifiers, payload: mods})
}

export const setSearchTerm = (input) => (dispatch) => {
    dispatch({type: query.setSearchTerm, payload: input})
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