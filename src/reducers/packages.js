import { packages } from '../actions/actionTypes'

const initialState = []

const packagesReducer = (state = initialState, action) => {
    switch (action.type) {
      case packages.fetchPackages:
        return [
          ...state,
        ]
      default:
        return state
    }
  }
  
  export default packagesReducer