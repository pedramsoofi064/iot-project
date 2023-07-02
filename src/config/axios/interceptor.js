import toast from 'pa-toast';
import Vue from 'vue';
export const interceptor = {
    request(request) {
        // console.log("request : ", request);
        // Do something before request is sent
        // request.headers.token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).token : ''; //FIXME
        // request.headers.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzeXN0ZW0iOiJpbnRlcm5fMjQiLCJjcmVhdGVUaW1lIjoiMTM5OTAzMTgxNDI4NDY5MjIiLCJ1c2VySWQiOiIyMjYyYzhiZS1mNmQxLTRkZTMtYjVhZi00NGVmZWM0ZTk4NjUiLCJwb2xpY3kiOiJ2YWxpZGl0eUR1cmF0aW9uIiwiZGF0YSI6IiIsInVuaXF1ZUZpZWxkcyI6W3sidXNlcm5hbWUiOiJhZG1pbiJ9XSwidmFsaWRpdHlEdXJhdGlvbiI6IjgxNDAwcyIsImNhY2hlYWJsZSI6dHJ1ZX0.FGI6os4WPJEEFzIApm6KtSJIIVl29gOF_ZdZj9MMtcc';
        // request.headers['name-space'] = 'sejam_pantel';
        if (!ignoredURLs.some(url => request.url.indexOf(url) >= 0)) {
            // console.log('showing cover for: ', request.url);
            // if (request.url.indexOf('test') == -1 && request.method != 'post') {
            //     window.loadings.push(1);
            // }
        } else {
            console.log('ignored showing cover for: ', request.url);
        }
        return request;
    },

    requestError(error) {
        // Do something with request error
        return Promise.reject(error);
    },

    response(response) {
        // console.log("response : ", response);
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (!ignoredURLs.some(url => response.config.url.indexOf(url) >= 0)) {
            // console.log('removing cover for: ', response.config.url);
            window.loadings.pop();
        } else {
            console.log('ignored removing cover for: ', response.config.url);
        }
        return response.data;
    },

    responseError(error = {}) {
        //console.log("response : ", error);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // console.log(error.response.data.meta.code,window.serverConfig.errorMessages.map)

        if (error.response == undefined || error?.response?.data == undefined) {
            toast.error('کاربر گرامی لطفا برای ادامه مراحل اینترنت خود را چک کنید و از خاموش بودن وی پی ان اطمینان حاصل فرمایید.');
            Vue.prototype.$announcer.set('کاربر گرامی لطفا برای ادامه مراحل اینترنت خود را چک کنید و از خاموش بودن وی پی ان اطمینان حاصل فرمایید.');
            window.loadings.pop();
        }

        if (error.response?.status == 403 && error.response.headers['content-type'] == 'text/html') {
            toast.error('کاربر گرامی لطفا برای ادامه مراحل اینترنت خود را چک کنید و از خاموش بودن وی پی ان اطمینان حاصل فرمایید.');
            window.loadings.pop();
        }

        if (window?.serverConfig?.errorMessages?.map && error?.response?.data?.meta?.code) {
            let errorIndex = window.serverConfig.errorMessages.map.findIndex(e => e.code === error.response.data.meta.code);
            if (errorIndex >= 0) {
                // this.$announcer.set(window.serverConfig.errorMessages.map[errorIndex].message, 'assertive')

                toast.error(window.serverConfig.errorMessages.map[errorIndex].message);
                Vue.prototype.$announcer.set(window.serverConfig.errorMessages.map[errorIndex].message);
            } else {
                if (ignoredErrors.some(url => error?.response?.config?.url.indexOf(url) >= 0)) {
                    toast.info(error?.response?.data?.data?.message?.fa);
                    Vue.prototype.$announcer.set(error?.response?.data?.data?.message?.fa);
                } else {
                    toast.error(window.serverConfig.errorMessages.message);
                    Vue.prototype.$announcer.set(window.serverConfig.errorMessages.message);
                }
            }
        } else {
            toast.error(error?.response?.data?.data?.message?.fa);
            Vue.prototype.$announcer.set(error?.response?.data?.data?.message?.fa);
        }

        if (!ignoredURLs.some(url => error?.response?.config?.url.indexOf(url) >= 0)) {
            // console.log('removing cover for: ', error?.response?.config?.url);

            window.loadings.pop();
        } else {
            console.log('ignored removing cover for: ', error?.response?.config?.url);
            return Promise.reject(error.response ? error.response.data : {}); // short-circuit
        }

        if (error.response.data.meta.code == 'rateLimitExceeded' || error.response.data.meta.code == 'tokenExpired' || error.response.data.meta.code == 'tokenExpiredError') {
            setTimeout(() => {
                window.location.reload();
            }, 4000);
        }

        switch (error?.response?.status) {
            case 401: //Unauthorized
                break;
            case 403: //forbidden
                toast.error('متاسفانه خطایی رخ داد، لطفا دوباره تلاش کنید');
                Vue.prototype.$announcer.set('متاسفانه خطایی رخ داد، لطفا دوباره تلاش کنید');
                break;
            default:
        }
        if (error.code === 'ECONNABORTED') {
            toast.error('متاسفانه خطایی رخ داد، لطفا دوباره تلاش کنید');
            Vue.prototype.$announcer.set('متاسفانه خطایی رخ داد، لطفا دوباره تلاش کنید');
        }
        return Promise.reject(error.response ? error.response.data : {});
    }
};

const ignoredURLs = ['app/sejam@1/authentication'];

const ignoredErrors = ['sejamWebAuth@3/orderId'];
