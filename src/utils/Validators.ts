export class Validators {
   static isEmail(val: string): boolean{
         var EMAIL_REGEXP = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
        return EMAIL_REGEXP.test(val)
    }
}