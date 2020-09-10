import { combineReducers } from 'redux'
//import packages from '../reducers/packages'
import queryReducer from '../reducers/query'
import packagesReducer from '../reducers/packages'
import filterReducer from '../reducers/filters'

const rootReducer = combineReducers({
    packages: packagesReducer,
    query: queryReducer,
    filter: filterReducer
})

export default rootReducer