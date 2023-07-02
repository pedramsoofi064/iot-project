
const routes = [

    {
        path: '',
        name: 'main',
        component: ()=> import('./index/dashboard.view.vue'),
    },
    {
        path: 'sensor',
        name: 'sensor',
        component: ()=> import('./sensor/sensor.view.vue'),
    },
    {
        path: 'sensor/:id',
        name: 'eachSensor',
        component: ()=> import('./sensor/id/id.view.vue'),
    },
   
    {
        path: 'gateway',
        name: 'gateway',
        component: ()=> import('./gateway/gateway.view.vue'),
    },
      

    {
        path: 'profile',
        name: 'profile',
        component: ()=> import('./profile/profile.view.vue'),
    },
   
   
]

export default routes