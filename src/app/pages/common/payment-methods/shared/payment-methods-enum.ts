import { GenericModel } from "@shared/generic-model";

export enum PaymentMethodsEnum {
    hasPaymentMethods = 'hasPaymentMethods',
    paymentType = 'paymentType',
    creditCardType = 'creditCardType',
    debitCardType = 'debitCardType',
    creditCard = 'Credit Card',
    debitCard = 'Debit Card',

    valueZero = 0,
    trueString = 'true',

    getCreditCardsTypesErrorMessage = 'There was an error trying to get Credit Card Types information',
    getDebitCardsTypesErrorMessage = 'There was an error trying to get Debit Card Types information',
}

export class DataPaymentMethods {
    static typeCardArray: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, PaymentMethodsEnum.creditCard, '' ),
        GenericModel.createGenericModel( 2, PaymentMethodsEnum.debitCard, '' ),
    ];
}