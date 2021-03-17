import { authHeader } from '../_helpers/auth-header'

export const userService = {
    login,
    logout,
    getAll,
    createOrganization,
    getOrganization,
}


function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }


    return fetch(`${process.env.VUE_APP_BASE_BACKEND_ROOT}/account/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user))
            }

            return user
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user')
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${process.env.VUE_APP_BASE_BACKEND_ROOT}/users`, requestOptions).then(handleResponse)
}

function getOrganization() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${process.env.VUE_APP_BASE_BACKEND_ROOT}/organization`, requestOptions).then(handleResponse)
}

function createOrganization(data) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    return fetch(`${process.env.VUE_APP_BASE_BACKEND_ROOT}/account/create`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user))

            }

            return user
        })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout()
                location.reload(true)
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}