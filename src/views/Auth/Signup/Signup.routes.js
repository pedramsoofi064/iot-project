
import Step1 from './Step1/Signup.Step1.vue'
import Step2 from './Step2/Signup.Step2.vue'




const routes = [
    {
        path: '',
        redirect: 'step1'
    },  
    {
        path: 'step1',
        name: 'step1',
        component: Step1
    },
    {
        path: 'step2',
        name: 'step2',
        component: Step2
    },
 
]


export default routes