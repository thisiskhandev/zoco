import { Utilities } from "@shared/utilities";

export class GeneralInfoModel {
    providerName : string;
    fiscalData : string;
    homeAddress : string;
    country : string;
    state : string;
    city: string;
    zipCode : string;
    email : string;
    responsibleName : string;
    phoneNumber : Array<string>;

    constructor() {
        this.providerName = '';
        this.fiscalData = '';
        this.homeAddress = '';
        this.country = '';
        this.state = '';
        this.city= '';
        this.zipCode = '';
        this.email = '';
        this.responsibleName = '';
        this.phoneNumber= [];
    }
}