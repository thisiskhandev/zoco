import { ContactInfoModel } from "@commons/contact-info/shared/contact-info.model";
import { GenericFormModel } from '@shared/generic-form-model';
import { GeneralInfoModel } from "../general-info/shared/general-info-model";

export class BasicInfoModel implements GenericFormModel {   
    id: number;   
    generalInfo: GeneralInfoModel;
    contactInfo : Array <ContactInfoModel>;

    constructor() {
        this.generalInfo = new GeneralInfoModel();
        this.contactInfo = new Array <ContactInfoModel>();
        this.contactInfo.push(new ContactInfoModel());
    }

    setData(data: any): void {
        //TODO isilva realizar metodo de edicion
    }
}