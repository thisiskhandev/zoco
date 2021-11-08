import { Utilities } from "@shared/utilities";
import { GenericModel } from "@shared/generic-model";
import { GenericFormModel } from "@shared/generic-form-model";

export class PaymentMethodsModel implements GenericFormModel {
    id : number;
    hasPaymentMethods : string;
    acceptCreditCard : string;
    acceptDebitCard : string;
    creditCardType: Array<number>;
    debitCardType : Array<number>;

    constructor(){
        this.id = null;
        this.hasPaymentMethods = Utilities.falseString;
        this.acceptCreditCard = Utilities.falseString;
        this.acceptDebitCard = Utilities.falseString;
        this.creditCardType = [];
        this.debitCardType = [];
    }

    setData() {}
}