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
        async changePass() {
            this.loading = true;
            try {
                 await services.changePass({
                    ...this.model,
                    phoneNumber: '+' + this.mobile
                })
                this.$router.push('/account/signin')
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