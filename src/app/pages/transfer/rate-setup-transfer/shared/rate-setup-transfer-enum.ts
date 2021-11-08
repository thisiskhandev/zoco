import { GenericModel } from "@shared/generic-model";

export enum RateSetupTransferEnum {
    title = 'Transfer Services Rates',
    subtitle = '',
    
    origin = 'origin',
    destination = 'destination',
    vehicle = 'vehicle',
    service = 'service',
    peopleNumber = 'peopleNumber',
    bagsNumber = 'bagsNumber',
    handbagsNumber = 'handbagsNumber',
    price = 'price',
    excludeTax = 'excludeTax',
    extraChargesPrice = 'extraChargesPrice',
    messageLuggage = 'The maximum amount of luggage and hand luggage is not limited to the capacity the vehicle.',

    textMaxSize = 180,
    numberMaxSize = 5,
    valueOne = 1,
    sizeVector = 14,

    messageErrorSave = 'There was an error trying to save the rates',
    messageErrorUpdate = 'There was an error trying to update the rates',
    messageSuccessFullSave = 'The Rates has been saved successfully',
    messageSuccessFullUpdate = 'The Rates has been updated successfully',

}

export class DataRateSetupTransfer {
    
    static serviceArray: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, 'One way', '' ),
        GenericModel.createGenericModel( 2, 'Round trip', '' ),
    ];
}