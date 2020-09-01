import { combineReducers } from 'redux'
import { packages } from '../actions/actionTypes'

const initialState = null

const currPackages = (state = initialState, action) => {
  switch (action.type) {
    case packages.fetchPackages:
      return [
        ...action.payload.results,
      ]
    default:
      return state
  }
}

const totalPackages = (state = 0, action) => {
  switch (action.type) {
    case packages.fetchPackages:
      return action.payload.total
    default:
      return state
  }
}

const packagesReducer = combineReducers({
    currPackages,
    totalPackages
})

export default packagesReducer