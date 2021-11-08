import { GenericFormModel } from "@shared/generic-form-model";
import { TaxesSetupModel } from "@commons/taxes-setup/shared/taxes-setup-model";
import { PaymentMethodsModel } from "@commons/payment-methods/shared/payment-methods-model";
import { AgeRangeModel } from "../age-range/shared/age-range-model";

export class PoliciesPaymentModel implements GenericFormModel {
    id : number;
    activityId : number;
    taxesSetup : TaxesSetupModel;
    paymentMethods : PaymentMethodsModel;
    ageRange : AgeRangeModel;

    constructor(){
        this.id = null;
        this.activityId = null;
        this.taxesSetup = new TaxesSetupModel();
        this.paymentMethods = new PaymentMethodsModel();
        this.ageRange = new AgeRangeModel();
    }
    
    setData(){
    }
}