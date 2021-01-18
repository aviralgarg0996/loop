import moment from 'moment';

export default class Util {

   static getFormattedDate(dateTime: string) {
      return moment(dateTime, 'yyyy-MM-DD hh:mm:ss').format('DD.MM.yyyy')
   }
   static getFormattedDateTZ(dateTime: string) {
      return moment(dateTime).format('DD.MM.yyyy')
   }

   static isEmail(email: string) {
      return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
   }

   // logging util function
   static log = (...args: any[]) => {
      console.log(`%cDEMO%c ${new Date().toUTCString().slice(17, 25)}:`, 'padding: 2px 4px; background-color: #662EFF; color: #FFFFFF; border-radius: 4px', 'color: #662EFF', ...args);
   };

   static logError = (...args: any[]) => {
      console.log(`%cERROR%c ${new Date().toUTCString().slice(17, 25)}:`, 'padding: 2px 4px; background-color: #F03E3E; color: #FFFFFF; border-radius: 4px', 'color: #F03E3E', ...args);
   };

   static logHelp = (...args: any[]) => {
      console.log(`%cHELP%c ${new Date().toUTCString().slice(17, 25)}:`, 'padding: 2px 4px; background-color: #329AF0; color: #FFFFFF; border-radius: 4px', 'color: #329AF0', ...args);
   };


}