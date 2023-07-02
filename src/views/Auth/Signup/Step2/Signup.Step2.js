import {
    ValidationObserver,
    ValidationProvider
} from 'vee-validate';
import services from '../../Auth.services'

export default {
    name: 'signupStep2',
    components: {
        ValidationObserver,
        ValidationProvider,
    },
    data() {
        return {
            loading: false,

            model: {
                "code": 140204,
                "newPassword": ""
            }
        }
    },
    computed: {
        mobile() {
            return this.$route.query.mobile || 'موبایل'
        }
    },
    methods: {
        async verify() {
            this.loading = true;
            try {
                const response = await services.verify({
                    ...this.model,
                    phoneNumber: '+' + this.mobile
                })
                localStorage.setItem('token' , response.data.token)
                this.$router.push('/dashboard')
            }
            catch (err) {
                this.$toast.error("خطایی رخ داد");

            }
            finally {
                this.loading = false;

            }
        }
    }

 
}