import { combineReducers } from 'redux'
//import packages from '../reducers/packages'
import queryReducer from '../reducers/query'
import packagesReducer from '../reducers/packages'

const rootReducer = combineReducers({
    packages: packagesReducer,
    query: queryReducer
})

export default rootReducer