import { filter, components } from './actionTypes'
import Fuse from 'fuse.js'

export const searchComponents = () => (dispatch, getState) => {
    const { searchTerm } = getState().filter
    const { all } = getState().components

    const searchedList = search(all, searchTerm)

    dispatch({type: components.searchList, payload: searchedList})
}

export const setSearchTerm = (input) => (dispatch) => {
    dispatch({type: filter.setSearchTerm, payload: input})
}

export const setDisplayOffset = (displayOffset) => (dispatch) => {
    dispatch({type: filter.setDisplayOffset, payload: displayOffset})
}

const search = (list, inputValue) => {
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