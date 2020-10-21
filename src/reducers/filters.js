import { combineReducers } from 'redux'
import { filter } from '../actions/actionTypes'

const displayOffset = (state = 0, action) => {
    switch (action.type) {
        case filter.setDisplayOffset:
            return action.payload
        default:
            return state
    }
}

const searchTerm = (state = '' , action) => {
    switch (action.type) {
      case filter.setSearchTerm:
        return action.payload
      default:
        return state
    }
}

const filterReducer = combineReducers({
    displayOffset,
    searchTerm,
})

export default filterReducer