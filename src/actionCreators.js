const setToken = (token, userId) => {
    return {
        type: "SET_TOKEN",
        token: token,
        id: userId
    }
}

const setUserData = (data) => {
    return {
        type: "SET_USER_DATA",
        data: data
    }
}

export { setToken, setUserData }