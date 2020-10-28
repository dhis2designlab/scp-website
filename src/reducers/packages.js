import { combineReducers } from 'redux'
import { packages } from '../actions/actionTypes'

const currPackages = (state = [], action) => {
  switch (action.type) {
    case packages.fetchPackages:
      var arr = [...state];
      if (action.payload.offset === 0) {
        arr = new Array(action.payload.data.total);
      }
      arr.splice(action.payload.offset, action.payload.data.objects.length, ...action.payload.data.objects)
      return arr
    default:
      return state
  }
}

const totalPackages = (state = 0, action) => {
  switch (action.type) {
    case packages.fetchPackages:
      return action.payload.data.total
    default:
      return state
  }
}

const searched = (state = false, action) => {
  switch (action.type) {
    case packages.fetchPackages:
      return true
    default:
      return state
  }
}

const packagesReducer = combineReducers({
    currPackages,
    totalPackages,
    searched
})

export default packagesReducer