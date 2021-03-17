import { authHeader } from '../_helpers/auth-header'

export const imageService = {
    uploadImage,
    getImages
}

function uploadImage(image) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }

    const imgbbKey = process.env.VUE_APP_IMGBB_API_KEY


    return fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}&${image}`, requestOptions)
        .then(response => {
            uploadImageInformation(response).then(data => {
                return data
            })
        })
}

function uploadImageInformation(data) {
    let user = JSON.parse(localStorage.getItem('user'))

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token },
        body: JSON.stringify(data)
    }

    return fetch(`${process.env.VUE_APP_BASE_BACKEND_ROOT}/image/add`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response.url
        })
}

function getImages() {
    let user = JSON.parse(localStorage.getItem('user'))

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token },
        body: JSON.stringify(data)
    }

    return fetch(`${process.env.VUE_APP_BASE_BACKEND_ROOT}/image`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response
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