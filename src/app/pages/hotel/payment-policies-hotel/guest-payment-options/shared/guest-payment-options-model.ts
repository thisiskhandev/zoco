import { GuestPaymentOptionsEnum } from './guest-payment-options-enum';
import { GenericFormModel } from '@shared/generic-form-model';

export class GuestPaymentOptionsModel implements GenericFormModel {
    id : number;
    chargeToYourCreditCard: string = GuestPaymentOptionsEnum.chargeToYourCreditCardDefaultValue;
    creditCardTypes: Array<number> = [];

    // Estos datos no se utilizan pero se envian porque el API los solicita en el json.
    applyVatTax: string         = GuestPaymentOptionsEnum.applyVatTax         ;
    vatTaxMont: number          = GuestPaymentOptionsEnum.vatTaxMont          ;
    applyCityTax: string        = GuestPaymentOptionsEnum.applyCityTax        ;
    priceIncludeCityTax: string = GuestPaymentOptionsEnum.priceIncludeCityTax ;
    cityTaxAmount: number       = GuestPaymentOptionsEnum.cityTaxAmount       ;
    cityTaxType: number         = GuestPaymentOptionsEnum.cityTaxType         ;

    constructor() {
        this.id = null;
        this.chargeToYourCreditCard = GuestPaymentOptionsEnum.chargeToYourCreditCardDefaultValue;
        this.creditCardTypes = [];
    }

    setData() {}

}