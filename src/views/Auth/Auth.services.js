import axios from 'axios'
export default {
    signup(data) {
        return axios({
            method: "POST",
            url: '/auth/signup',
            
            data: data
        })
    },
    verify(data) {
        return axios({
            method: "POST",
            url: '/auth/signup/verify',
            
            data
        })
    },
    login(data) {
        return axios({
            method: "POST",
            url: '/auth/login',
            
            data
        })
    },
    forgetPass(data) {
        return axios({
            method: "POST",
            url: '/auth/forgot-password',
            
            data
        })
    },
    changePass(data) {
        return axios({
            method: "POST",
            url: '/auth/forgot-password/change-pass',
            
            data
        })
    },

}