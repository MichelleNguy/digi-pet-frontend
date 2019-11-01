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

const logout = () => {
    return {
        type: "LOGOUT"
    }
}

export { setToken, setUserData, logout }
