export const SET_HEADER_SCALES = 'SET_HEADER_CSALES'

const initialState = {
    scales: {
    height : 'low',
    width :'narrow' ,
    }
}

export function headerReducer(state = initialState, action) {
    var newState = state
    
    switch (action.type) {
        case SET_HEADER_SCALES:
            newState = { ...state, scales: action.scales }
            break
        default:
            return state
    }
    return newState
}
            