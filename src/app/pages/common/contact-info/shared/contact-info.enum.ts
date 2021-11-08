import { GenericModel } from "@shared/generic-model";

export enum ContactInfoEnum {
    inputMaxSize = 70,
    textMaxSize = 180,
    maxPhoneItems = 1,
    maxContacts = 'maxContacts',
    phones = 'phones',
    contactName = 'contactName',
    email = 'email',
    typeContact = 'typeContact',
    contactInfoList = 'contactInfoList',

    valueZero = 0,
    valueOne = 1,
}

export class DataContactInfo {
    static typeContactInfoArray: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, 'Administrative', '' ),
        GenericModel.createGenericModel( 2, 'Comertial', '' ),
    ];
}