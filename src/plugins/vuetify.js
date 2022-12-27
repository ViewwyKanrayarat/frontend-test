import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: false,
    themes: {
      light: {
        primary: '#252b67',
        // tab nav tool
        secondary: '#DAE7F0',
        //bg อันเก่า
        bg: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        textbtn: '#FFFFFF',
        border: '#04174f',
        textTable: '#CCCCCC',
        HeadersText: '#252b67',
        IconHeaders: '#868080',
        HeadersTitle: '#252b67',
        TextCard: '#3d3838',
        CardPage2: '#BECBE2',
        TextCardData: '#252b67',
      },
      dark: {
        primary: '#CCCCCC',
        secondary: '#252b67',
        bg: '#DAE7F0',
        backgroundColor: '#DAE7F0',
        textbtn: '#616696',
        border: '#CDCDCD',
        textTable: '#CDCDCD',
        HeadersText: '#FFFFFF',
        IconHeaders: '#ababab',
        HeadersTitle: '#3d3838',
        TextCard: '#252b67',
        CardPage2: '#BECBE2',
        TextCardData: '#252b67',
      }
    }
  }
})
