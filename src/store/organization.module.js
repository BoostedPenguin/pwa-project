import { userService } from '../_services/user.service'

const user = JSON.parse(localStorage.getItem('user'))

export const organization = {
    namespaced: true,
    state: {
        status: true,
        organization: {},
        users: {},
    },
    actions: {
        getOrganization({ commit, dispatch }) {
            userService.getOrganization()
                .then(data => {
                    const org = {
                        name: data.name,
                        id: data.id,
                    }
                    const { users, ...rest } = data
                    commit('organizationRequest', { org, users })
                    dispatch('images/getImages', null, { root: true })
                    return data
                },
                    error => {
                        console.log(error)
                    })
                .catch(err => {
                    dispatch('images/getImages', null, { root: true })
                    commit('changeStatus', false)
                })
        }
    },
    mutations: {
        organizationRequest(state, { org, users }) {
            state.organization = org
            state.users = users
        },
        changeStatus(state, payload) {
            state.status = payload
        },
    }
}