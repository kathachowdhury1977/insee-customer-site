import i18n from "i18next";
import Backend from "i18next-xhr-backend";

import { initReactI18next } from "react-i18next";
let userName = localStorage.getItem('userData')
userName = JSON.parse(userName)
const countryCode = userName ? userName.countryCode : ''


i18n

  .use(Backend)

  .use(initReactI18next)

  .init({

    lng: countryCode === 'TH' ? 'th' : countryCode === 'VN' ? 'en' : 'en',   //default language

    fallbackLng: countryCode === 'TH' ? 'th' : countryCode === 'VN' ? 'en' : 'en', //when specified language translations not present 

//then fallbacklang translations loaded.

    debug: true,


       backend: {
      /* translation file path */
       loadPath:'./assets/i18n/{{ns}}/{{lng}}.json',
     // loadPath: "https://cdn.mindbowser.com/assets/i18n/{{ns}}/{{lng}}.json",


    },
 

/* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */


    ns: ["translations"],

    defaultNS: "translations",

    keySeparator: false,

    interpolation: {

      escapeValue: false,

      formatSeparator: ",",

    },

    react: {

      wait: true,

    },

  });


export default i18n;