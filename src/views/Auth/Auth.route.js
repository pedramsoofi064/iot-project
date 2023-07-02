import Signup from './Signup/Signup.vue'
import Signin from './Signin/Signin.vue'
import SignupChildren from './Signup/Signup.routes'
import ForgetPassword from './ForgetPassword/ForgetPassword.vue'
import forgetPassChildren from './ForgetPassword/ForgetPassword.routes'

const routes = [
    {
        path: '/',
        redirect: 'signin'
    },
    {
        path: 'signup',
        name: 'signup',
        component: Signup,
        children: SignupChildren
    },
    {
        path: 'signin',
        name: 'signin',
        component: Signin,
    },
    {
        path: 'forget-password',
        name: 'forgetPassword',
        component: ForgetPassword,
        children:forgetPassChildren
    },
   
    
]

export default routes