import { GenericModel } from '@shared/generic-model';


export enum SettingsTransferEnum {
    pageTitle = 'Transfer Service Settings',
    pageSubtitle = 'Configure the transfer service options per vehicle',    
    
    textMaxInputMaxSize = 180,
    zero = 0,
    one = 1,
    max = 25,
    yes = 'Yes',
    no = 'No',

    incompleteInfoMesssage = 'The information is not complete all fields are required)',
    saveTransferSettingsErrorMessage           = 'There was an error trying to save your settings',
    saveTransferSettingsSuccessfullMessage     = 'Transfer Settings has been saved successfully',
    updateTransferSettingsErrorMessage         = 'There was an error trying to update your settings',
    updateTransferSettingsSuccessfullMessage   = 'Transfer Settings has been updated successfully'
}

export class SettingsTransferData {

    static daysArray: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, '1 Day', '' ),
        GenericModel.createGenericModel( 2, '2 Days', '' ),
        GenericModel.createGenericModel( 3, '3 Days', '' ),
        GenericModel.createGenericModel( 4, '4 Days', '' ),
        GenericModel.createGenericModel( 5, '5 Days', '' ),
        GenericModel.createGenericModel( 6, '6 Days', '' ),
        GenericModel.createGenericModel( 7, '7 Days', '' ),
    ];

    static hoursArray: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, '4 Hours', '' ),
        GenericModel.createGenericModel( 2, '8 Hours', '' ),
        GenericModel.createGenericModel( 3, '12 Hours', '' ),
        GenericModel.createGenericModel( 4, '16 Hours', '' ),
        GenericModel.createGenericModel( 5, '24 Hours', '' ),
    ];
}
