import { combineReducers } from 'redux'
import { query } from '../actions/actionTypes'

const modifiers = (state = [] , action) => {
    switch (action.type) {
      case query.setModifiers:
        return [
            ...action.payload
        ]
      default:
        return state
    }
}

const searchTerm = (state = null , action) => {
    switch (action.type) {
      case query.setSearchTerm:
        return action.payload
      default:
        return state
    }
}

const queryReducer = combineReducers({
    modifiers,
    searchTerm
})
  
export default queryReducer