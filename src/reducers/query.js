import { combineReducers } from 'redux'
import { query } from '../actions/actionTypes'

// const initialMods = ['keywords:dhis2-component-search']
const initialMods = ['@dhis2/ui-core']

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
    offset
})
  
export default queryReducer