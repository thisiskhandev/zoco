import { GenericModel } from "@shared/generic-model";

export enum RatesActivitiesEnum {
    title = 'Activities Rate & Prices',
    subtitle = '',
    numberMaxSize = 5,

    excludeTaxes = 'excludeTaxes',

    incompleteInfoMesssage = 'The information is not complete (Activity, type of person and price are required fields)',

    messageErrorSave = 'There was an error trying to save the rates and prices',
    messageErrorUpdate = 'There was an error trying to update the rates and prices',
    messageSuccessFullSave = 'The Rates and Prices has been saved successfully',
    messageSuccessFullUpdate = 'The Rates and Prices has been updated successfully',
}

export class DataRatesActivities {

    static personArray: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, 'Adult', '' ),
        GenericModel.createGenericModel( 2, 'Children', '' ),
        GenericModel.createGenericModel( 3, 'Infant', '' ),
    ];
}