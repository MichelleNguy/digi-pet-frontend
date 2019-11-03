const setToken = (token, userId) => {
    return {
        type: "SET_TOKEN",
        token: token,
        userId: userId
    }
}

const logout = () => {
    return {
        type: "LOGOUT"
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

const setShops = (shopArray) => {
    return {
        type: "SET_SHOPS",
        shops: shopArray
    }
}


export { setToken, setUserData, logout, addToCare, clearCare, setShops }
