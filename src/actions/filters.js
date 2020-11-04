import { filter, components } from './actionTypes'
import Fuse from 'fuse.js'

export const searchComponents = () => (dispatch, getState) => {
    const filters = getState().filter
    const { all } = getState().components
    console.log(filters)

    const filteredList = applyFilters(all, filters)
    console.log(filteredList)
    const searchedList = search(filteredList, filters.searchTerm)

    dispatch({type: components.searchList, payload: searchedList})
}

export const setFilterAndSearch = (filters) => (dispatch, getState) => {
    dispatch({type: filter.setFilters, payload: filters})
    dispatch(searchComponents())
}

export const setSearchTerm = (input) => (dispatch) => {
    dispatch({type: filter.setSearchTerm, payload: input})
}

export const setDisplayOffset = (displayOffset) => (dispatch) => {
    dispatch({type: filter.setDisplayOffset, payload: displayOffset})
}

const applyFilters = (list, filters) => {
    const { framework } = filters

    return list.filter(component => {
        // Filter on framework
        if(component.language !== framework) return false

        return true
    })
}


const search = (list, inputValue) => {
    if(list.length === 0) return []
    if(inputValue.length === 0) return list

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