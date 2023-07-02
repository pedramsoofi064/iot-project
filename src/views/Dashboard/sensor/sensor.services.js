import axios from "axios"

export default {
    create(data) {
        const token = localStorage.getItem('token')
        return axios({
            method: "POST",
            url: '/nodes',
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
            url: '/nodes',
            headers: {
                Authorization: `Bearer ${token}`
            },

        })
    },
    getOne(id) {
        const token = localStorage.getItem('token')
        return axios({
            method: "GET",
            url: '/nodes' + `/${id}`,
            headers: {
                Authorization: `Bearer ${token}`

            },

        })
    },
    edit(id, data) {
        const token = localStorage.getItem('token')
        return axios({
            method: "PATCH",
            url: '/nodes' + `/${id}`,
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
            url: '/nodes' + `/${id}`,
            headers: {
                Authorization: `Bearer ${token}`

            },

        })
    },
}