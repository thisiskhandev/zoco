import { GenericModel } from "@shared/generic-model";

export enum TaxesSetupEnum {
    vatTax = 'vatTax',
    percentageVat = 'percentageVat',
    cityTax = 'cityTax',
    amountCityTax = 'amountCityTax',
    numberMaxSize = 5,
    true = 'true',
    regexNumbers='[1-9][0-9]*$',
}

export class DataTaxesSetup {
    static percentageArray: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, '8', '' ),
        GenericModel.createGenericModel( 2, '10', '' ),
        GenericModel.createGenericModel( 3, '12', '' )
    ];
}