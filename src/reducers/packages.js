import { packages } from '../actions/actionTypes'

const initialState = null

const packagesReducer = (state = initialState, action) => {
    switch (action.type) {
      case packages.fetchPackages:
        return [
          ...action.payload.results,
        ]
      default:
        return state
    }
  }
  
  export default packagesReducer