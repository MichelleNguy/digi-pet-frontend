const API_URL = 'http://localhost:3000';

const HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

// Handle all POST requests to backend API
// example: http://localhost:3000/users
const fetchPost = (objectToPost, slug) => {
    return fetch(`${API_URL}/${slug}`, {
        method: 'POST',
        HEADERS,
        body: JSON.stringify(objectToPost)
    }).then(res => res.json())
}

// Handle all GET requests to backend API
// example: http://localhost:3000/users/1
const fetchGet = (slug) => {
    return fetch(`${API_URL}/${slug}`)
        .then(res => res.json());
}





export default { API_URL, HEADERS, fetchPost, fetchGet, fetchUserData }
