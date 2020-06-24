import { combineReducers } from 'redux'
import packages from '../reducers/packages'
const rootReducer = combineReducers({
    packages
})

export default rootReducer