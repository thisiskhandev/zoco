import { Utilities } from "@shared/utilities";
import { GenericFormModel } from "@shared/generic-form-model";

export class ContactInfoModel implements GenericFormModel {
    id: number;
    contactName : string;
    email : string;
    type : string = '';
    phoneNumber : Array<string>;

    constructor() {
        this.contactName =  '';
        this.email = '';
        this.type =  '';
        this.phoneNumber = [];
    }


    static createContactInfoModel (  contactName : string, email : string,  type : string, phoneNumber : Array<string> ): ContactInfoModel {
        let contactInfoModel = new ContactInfoModel();
        contactInfoModel.contactName = contactName;
        contactInfoModel.email = email;
        contactInfoModel.type = type;
        contactInfoModel.phoneNumber =  phoneNumber;
        return contactInfoModel
    }

    setData(data: any): void {
        this.contactName = data.contact_name;
        this.email = data.email;
        this.type = data.contact_type.id;
        this.phoneNumber =  [];
        this.phoneNumber.push(data.phone);
    }
    
}