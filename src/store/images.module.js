import { imageService } from '../_services/image.service'
import { router } from '../router/index'

export const images = {
    namespaced: true,
    state: {
        images: {},
        errorUpload: false,
        successUpload: false,
    },
    actions: {
        uploadImage({ dispatch, commit, getters }, data) {
            imageService.uploadImage(data)
                .then(response => {
                    commit('saveImages', response)
                    commit('saveSuccessUpload')
                })
                .catch(() => {
                    commit('saveErrorUpload')
                })
        },
        getImages({ commit, state }) {
            imageService.getImages()
                .then(response => {
                    commit('saveImages', response)
                })
                .catch(err => {
                    console.log("HELLO")
                    let images = JSON.parse(localStorage.getItem('images'))
                    commit('saveImages', images)
                })
        }
    },
    mutations: {
        resetStatus(state) {
            state.errorUpload = false
            state.successUpload = false
        },
        saveImages(state, images) {
            state.images = images
        },
        saveErrorUpload(state) {
            state.errorUpload = true
        },
        saveSuccessUpload(state) {
            state.successUpload = true
        }
    },
    getters: {
        getStateImages(state) {
            return state.images
        }
    }
}