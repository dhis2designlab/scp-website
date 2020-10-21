import { combineReducers } from 'redux'
import queryReducer from '../reducers/query'
import packagesReducer from '../reducers/packages'
import filterReducer from '../reducers/filters'
import componentReducer from '../reducers/components'

const rootReducer = combineReducers({
    packages: packagesReducer,
    query: queryReducer,
    filter: filterReducer,
    components: componentReducer
})

export default rootReducer