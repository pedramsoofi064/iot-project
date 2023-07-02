import axios from 'axios';
import { interceptor } from './interceptor';
// global axios defaults
axios.defaults.timeout = 70000;
// axios.defaults.timeout = 1000;

axios.interceptors.request.use(interceptor.request, interceptor.requestError);
axios.interceptors.response.use(interceptor.response, interceptor.responseError);
