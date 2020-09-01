import { combineReducers } from 'redux'
//import packages from '../reducers/packages'
import modifiersReducer from '../reducers/modifiers'
import packagesReducer from '../reducers/packages'
const rootReducer = combineReducers({
    packages: packagesReducer,
    modifiers: modifiersReducer
})

export default rootReducer