import { combineReducers } from 'redux'
import { filter } from '../actions/actionTypes'

const filters = (state = 0, action) => {
  switch (action.type) {
    case filter.setFilters:
      return action.payload.data.total
    default:
      return state
  }
}

const displayOffset = (state = 0, action) => {
    switch (action.type) {
        case filter.setDisplayOffset:
            return action.payload
        default:
            return state
    }
}
const filterReducer = combineReducers({
    filters,
    displayOffset
})

export default filterReducer