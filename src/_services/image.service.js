import { authHeader } from '../_helpers/auth-header'

export const imageService = {
    uploadImage,
    getImages
}

function uploadImage(data) {

    const formData = new FormData()
    formData.append("image", data.currentFile)
    const requestOptions = {
        method: 'POST',
        body: formData
    }
    const imgbbKey = process.env.VUE_APP_IMGBB_API_KEY

    return fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return uploadImageInformation(response, data)
                .then(data => {
                    return data
                })
        })
}

function uploadImageInformation(data, imageDetails) {
    let user = JSON.parse(localStorage.getItem('user'))

    const uploaded = new Date(parseInt(data.data.time) * 1000)
    const requestData = {
        id: data.data.id,
        url: data.data.url,
        deleteUrl: data.data.delete_url,
        UploadedAt: uploaded,
        title: imageDetails.title,
        description: imageDetails.description,
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token },
        body: JSON.stringify(requestData)
    }

    return fetch(`${process.env.VUE_APP_BASE_BACKEND_ROOT}/image/add`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response
        })
}

function getImages() {
    let user = JSON.parse(localStorage.getItem('user'))

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token },
    }

    return fetch(`${process.env.VUE_APP_BASE_BACKEND_ROOT}/image`, requestOptions)
        .then(handleResponse)
        .then(response => {
            localStorage.setItem('images', JSON.stringify(response))
            return response
        })
        .catch(err => {
            console.log("ERROR")
            let images = JSON.parse(localStorage.getItem('images'))
            return images
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