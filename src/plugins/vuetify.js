import Vue from 'vue';
import Vuetify from 'vuetify';
import fa from 'vuetify/src/locale/fa.ts'

Vue.use(Vuetify);

export default new Vuetify({
    rtl: true,
    lang: {
        locales: {
            fa,
            
        },
        current: 'fa'
    },
    theme: {
        dark: true,
        themes: {
          dark: {
            primary: '#052D5E',
            secondary: '#79B1F3',
            accent: '#052D5E',
          },
        },
      },
});