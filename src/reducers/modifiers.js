import { modifiers } from '../actions/actionTypes'

const modifiersReducer = (state = [] , action) => {
    switch (action.type) {
      case modifiers.setModifiers:
        return [
            ...action.payload
        ]
      default:
        return state
    }
  }
  
  export default modifiersReducer