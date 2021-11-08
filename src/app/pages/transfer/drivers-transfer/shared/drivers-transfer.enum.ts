import { GenericModel } from '@shared/generic-model';

export enum DriversTransferEnum {
    pageTitle = 'Transfer Drivers',
    pageSubtitle = 'Load the information of the drivers that provide service',

    id =              'id',
    driverName=       'driverName',
    driverLicenceId=  'driverLicenceId',
    contactPhone=     'contactPhone',
    birthday=         'birthday',
    languages=        'languages',
    vehiclesTypes=     'vehiclesTypes',
    periodToworkFrom= 'periodToworkFrom',
    periodToworkTo =  'periodToworkTo',

    maxPhoneItems = 1,
    textMaxInputMaxSize = 180,
    legalyAdultAge = 21,
    maxHourToPick =24,
    valueZero = 0,
    valueOne = 1,

    incompleteInfoMesssage = 'The information is not complete (Driver name, driver license ID, and birthdate are required fields)',
    messageErrorUpdate = 'There was an error trying to update your Drivers',
    messageSuccessFullUpdate= 'Your Drivers has been updated successfully',
    messageErrorSave='There was an error trying to save your Drivers',
    messageSuccessFullSave= 'Your Drivers has been saved successfully',  
    messageErrorGetCarCategoriesList = 'There was an error trying to get Car Categories Types List information',
    dateSign = "-",
    emptyArray = "[]",
    allVehicleCategoriesId = 4
}

export class DriversTransferData {
    static vehicleCategoriesAll: GenericModel = GenericModel.createGenericModel( 4, 'All', '' );
}
