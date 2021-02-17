import { types } from "../types/types"

const initialState = {
    isOpen: false
}

export default (state = initialState, action) => {
    switch ( action.type ) {

    case types.uiOpenModal:
        return {
            ...state,
            isOpen: true
        }

    case types.uiCloseModal:
        return {
            ...state,
            isOpen: false
        }

    default:
        return state
    }
}
