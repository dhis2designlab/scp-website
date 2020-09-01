import { pagination } from '../actions/actionTypes'

const initialState = null

const paginationReducer = (state = initialState, action) => {
    switch (action.type) {
      case pagination.storePaginationOffset:
        return [
          ...action.payload.offset,
        ]
      default:
        return state
    }
  }
  
  export default paginationReducer