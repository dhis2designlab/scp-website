import { combineReducers } from 'redux'
import { components } from '../actions/actionTypes'

const all = (state = [], action) => {
  switch (action.type) {
    case components.createList:
      return  [...action.payload];
    default:
      return state
  }
}

const searched = (state = [], action) => {
  switch (action.type) {
    case components.searchList:
      return  [...action.payload];
    default:
      return state
  }
}

const packagesReducer = combineReducers({
    all,
    searched
})

export default packagesReducer