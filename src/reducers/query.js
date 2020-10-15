import { combineReducers } from 'redux'
import { query } from '../actions/actionTypes'

const initialMods = ['keywords:dhis2-component-search']

const modifiers = (state = initialMods, action) => {
    switch (action.type) {
      case query.setModifiers:
        return [
            ...action.payload
        ]
      default:
        return state
    }
}

const searchTerm = (state = '' , action) => {
    switch (action.type) {
      case query.setSearchTerm:
        return action.payload
      default:
        return state
    }
}

const offset = (state = 0, action) => {
  switch (action.type) {
    case query.setOffset:
      return action.payload
    default:
      return state 
  }
}

const queryReducer = combineReducers({
    modifiers,
    searchTerm,
    offset
})
  
export default queryReducer