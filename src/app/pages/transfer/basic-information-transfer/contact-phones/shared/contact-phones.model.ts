import { Utilities } from "@shared/utilities";

export class ContactPhonesModel {

    email: string;                               
    responsibleName: string;                     
    officePhone: string;                         
    twentyFourHourPhone: string;                 
    officePhoneNumber: string;                         
    twentyFourHourPhoneNumber: string;                 
    countryCallingCodeOfficePhone: string;       
    countryCallingCodeTwentyFourHourPhone: string;  


    constructor() {
        this.email=                                 '';
        this.responsibleName=                       '';
        this.officePhone=                           '';
        this.officePhoneNumber=                     '';
        this.twentyFourHourPhone=                   '';
        this.twentyFourHourPhoneNumber=             '';
        this.countryCallingCodeOfficePhone=         null;
        this.countryCallingCodeTwentyFourHourPhone= null;
    }

    setData(data: any) {
        Utilities.log('set data contacto phone: ', data);
        this.email=               data.email                 
        this.responsibleName=     data.responsibleName                
        this.officePhone=         (data.officePhone)         ? data.officePhone.phone_number :   '';              
        this.twentyFourHourPhone= (data.twentyFourHourPhone) ? data.officePhone.twentyFourHourPhone :   '';  
    }

}
