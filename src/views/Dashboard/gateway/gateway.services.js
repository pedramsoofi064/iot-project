import axios from "axios"

export default {
    create(data) {
        const token = localStorage.getItem('token')
        return axios({
            method: "POST",
            url: '/gateways',
            headers: {
                Authorization: `Bearer ${token}`

            },
            data
        })
    },
    getAll() {
        const token = localStorage.getItem('token')
        return axios({
            method: "GET",
            url: '/gateways',
            headers: {
                Authorization: `Bearer ${token}`
            },

        })
    },
    getOne(id) {
        const token = localStorage.getItem('token')
        return axios({
            method: "GET",
            url: '/gateways' + `/${id}`,
            headers: {
                Authorization: `Bearer ${token}`

            },

        })
    },
    edit(id, data) {
        const token = localStorage.getItem('token')
        return axios({
            method: "PATCH",
            url: '/gateways' + `/${id}`,
            headers: {
                Authorization: `Bearer ${token}`

            },
            data
        })
    },
    delete(id) {
        const token = localStorage.getItem('token')
        return axios({
            method: "DELETE",
            url: '/gateways' + `/${id}`,
            headers: {
                Authorization: `Bearer ${token}`

            },

        })
    },
}