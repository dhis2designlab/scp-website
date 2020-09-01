import { combineReducers } from 'redux'
//import packages from '../reducers/packages'
import paginationReducer from '../reducers/pagination'
import modifiersReducer from '../reducers/modifiers'
import packagesReducer from '../reducers/packages'
const rootReducer = combineReducers({
    packages: packagesReducer,
    pagination: paginationReducer,
    modifiers: modifiersReducer
})

export default rootReducer