import {
    ValidationObserver,
    ValidationProvider
} from 'vee-validate';
import services from '../../Auth.services'

export default {
    name: 'signupStep1',
    components: {
        ValidationObserver,
        ValidationProvider,

    },
    data() {
        return {
            loading: false,
            model: {
                phoneNumber: '',
            }
        }
    },
    methods: {
        async signup () {
            this.loading = true;
            try {
                await services.signup({
                    phoneNumber: '+' + this.model.phoneNumber
                })
                this.$router.push({
                    path: '/account/signup/step2',
                    query: {
                        mobile:this.model.phoneNumber
                    }
                })
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