const setToken = (token, userId) => {
    return {
        type: "SET_TOKEN",
        token: token,
        userId: userId
    }
}

const setUserData = (userData) => {
    return {
        type: "SET_USER_DATA",
        userData: userData
    }
}

const addToCare = (objectToAdd) => {
    return {
        type: "ADD_TO_CARE",
        objectToAdd: objectToAdd
    }
}

const clearCare = () => {
    return {
        type: "CLEAR_CARE",
    }
}

const logout = () => {
    return {
        type: "LOGOUT"
    }
}

export { setToken, setUserData, logout, addToCare, clearCare }
