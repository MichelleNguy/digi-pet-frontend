const reducer = (state, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token,
                id: action.id
            }
        case "SET_USER_DATA":
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }
}

export default reducer