import { combineReducers } from 'redux'
import { filter } from '../actions/actionTypes'

const initialState = {
    displayOffset: 0,
    searchTerm: '',
    framework: 'react'
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case filter.setFilters:
            return {
                ...state,
                ...action.payload
            }
        case filter.setDisplayOffset:
            return {
                ...state,
                displayOffset: action.payload
            }
        case filter.setSearchTerm:
            return {
                ...state,
                searchTerm: action.payload
            }
        default:
            return state
    }
}


export default filterReducer