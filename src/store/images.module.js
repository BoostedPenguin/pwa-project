import { imageService } from '../_services/image.service'
import { router } from '../router/index'

export const images = {
    namespaced: true,
    state: {
        images: {},
    },
    actions: {
        uploadImage({ dispatch, commit }, data) {
            imageService.uploadImage(data)
                .then(response => {
                    commit('saveImages', response)
                })
        },
        getImages({ dispatch, commit }) {
            imageService.getImages()
                .then(response => {
                    commit('saveImages', response)
                })
        }
    },
    mutations: {
        saveImages(state, images) {
            state.images = images
        },
    }
}