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
        async forgetPass () {
            this.loading = true;
            try {
                await services.forgetPass({
                    phoneNumber: '+' + this.model.phoneNumber
                })
                this.$router.push({
                    path: '/account/forget-password/step2',
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