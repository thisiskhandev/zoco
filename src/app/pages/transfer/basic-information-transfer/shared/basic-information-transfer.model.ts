import { GenericFormModel } from "@shared/generic-form-model";
import { ContactInfoModel } from "@commons/contact-info/shared/contact-info.model";
import { NameDetailsModel } from "../name-details/shared/name-details.model";
import { AddressInfoModel } from "../address-info/shared/address-info.model";
import { ContactPhonesModel } from "../contact-phones/shared/contact-phones.model";
import { Utilities } from "@shared/utilities";

export class BasicInformationTransferModel implements GenericFormModel {


    id: number ;                 
    contactInfo: Array <ContactInfoModel>;
    nameDetails: NameDetailsModel;
    addressInfo: AddressInfoModel;
    contactPhones: ContactPhonesModel;
 
    constructor() {
        this.nameDetails = new NameDetailsModel();
        this.addressInfo = new AddressInfoModel();
        this.contactPhones = new ContactPhonesModel();
        this.contactInfo = [];
        this.contactInfo.push(new ContactInfoModel());
        }
    
    setData(data: any): void {
        this.id            =  data.id;
        this.nameDetails   =  data.nameDetails;
        this.addressInfo   =  data.addressInfo as AddressInfoModel;
        this.contactPhones =  data.contactPhones as ContactPhonesModel;

        this.contactInfo = [];
        data.contactInfo.forEach(contact => {
            let contactModel = new ContactInfoModel();
            contactModel.setData(contact);
            this.contactInfo.push(contactModel);
        });
    }

    /**
     * @deprecated se necesita convertir la estructura del json transferCompleteInfo tal como muestra la clase, por lo tanto esta funcion quedara deprecada, y se dara uso a @link {setData}
     * @param data 
     */
    setDatax(data: any): void {
        const utilities = new Utilities();
        this.id                                     = data.id;
        this.nameDetails.name                       = data.companyName;
        this.nameDetails.fiscalData                 = (data.fiscalData) ? data.fiscalData : ''// TODO isilva falta recibir esto del API

        this.addressInfo.address                    = data.home_address;

        this.addressInfo.country                    = data.country;
        this.addressInfo.city                       = data.city;
        this.addressInfo.state                      = data. state;
        this.addressInfo.zip                        = data. zip;

        this.contactPhones.email                    = data.email;
        this.contactPhones.responsibleName          = data.responsible_name
        this.contactPhones.officePhone              = (data.phone[utilities.emptyLength]) ? data.phone[utilities.emptyLength]   : '';
        this.contactPhones.twentyFourHourPhone      = (data.phone[utilities.one])         ? data.phone[utilities.one]           : '';
        this.contactInfo                            = (data.contactInfo) ? data.contactInfo as Array <ContactInfoModel> : this.contactInfo;   
    }

}
