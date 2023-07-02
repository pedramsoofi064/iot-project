import {
    ValidationObserver,
    ValidationProvider
} from 'vee-validate';
import services from '../Auth.services'

export default {
    name: 'signin',
    components: {
        ValidationObserver,
        ValidationProvider,
    },
    data() {
        return {
            loading: false,
            model: {
                phoneNumber: '',
                password: ''

            }
        }
    },
    methods: {
        async login() {
            this.loading = true;
            try {
                const response = await services.login({
                    ...this.model,
                    phoneNumber: '+' + this.model.phoneNumber
                })
                localStorage.setItem('token' , response.data.token)
                this.$router.push('/dashboard')
            }
            catch (err) {
               if(err.response.data.message === "Unauthorized"){
                this.$toast.error("اطلاعات حساب کاربری یافت نشد");

               }
            }
            finally {
                this.loading = false;

            }
        }
    }
}