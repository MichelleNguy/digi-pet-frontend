const reducer = (state, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token,
                userId: action.userId
            }
        case "SET_USER_DATA": 
            return {
                ...state,
                userData: action.userData
            }
        case "LOGOUT":
            return {}
        default:
            return state
    }
}

export default reducer