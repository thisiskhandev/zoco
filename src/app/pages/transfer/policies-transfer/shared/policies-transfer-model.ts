import { GenericFormModel } from "@shared/generic-form-model";
import { TaxesSetupModel } from "@commons/taxes-setup/shared/taxes-setup-model";
import { PaymentMethodsModel } from "@commons/payment-methods/shared/payment-methods-model";
import { ExtraChargesModel } from "../extra-charges/shared/extra-charges-model";
import { WaitTimeModel } from "../wait-time/shared/wait-time-model";

export class PoliciesTranferModel implements GenericFormModel {
    
    id: number;
    transferId: number; 
    taxesSetup : TaxesSetupModel;
    paymentMethods : PaymentMethodsModel;
    extraCharges : ExtraChargesModel;
    waitTime : WaitTimeModel

    constructor() {
        this.id = null;
        this.transferId = null;
        this.taxesSetup = new TaxesSetupModel();
        this.paymentMethods = new PaymentMethodsModel();
        this.extraCharges = new ExtraChargesModel();
        this.waitTime = new WaitTimeModel();
    }

    setData() {    
    }
}