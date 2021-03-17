import { userService } from '../_services/user.service'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    organization: {},
}

export const organization = {
    namespaced: true,
    state: initialState,
    actions: {
        getOrganization({ commit }) {
            userService.getOrganization()
                .then(data => {
                    console.log(data)
                    commit('organizationRequest', data)
                    return data
                },
                    error => {
                        console.log(error)
                    })
        }
    },
    mutations: {
        organizationRequest(state, organization) {
            state.organization = organization
        },
    }
}