import { GenericModel } from "@shared/generic-model";

export enum ExcludeTaxesEnum {
    excludeTax = 'excludeTax',
    typeTax = 'typeTax',
    trueString = 'true',
}

export class DataExcludeRates {
    static taxesArray: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, 'City Tax', '' ),
        GenericModel.createGenericModel( 2, 'Vat Tax', '' ),
    ];
}