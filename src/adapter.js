const API_URL = 'http://localhost:3000';

const HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

const fetchUserData = () => {
    let id = parseInt(localStorage.userId)
    return fetch(`http://localhost:3000//users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.token
        }
    })
        .then(res => res.json())
        
}



export { API_URL, HEADERS, fetchUserData }
