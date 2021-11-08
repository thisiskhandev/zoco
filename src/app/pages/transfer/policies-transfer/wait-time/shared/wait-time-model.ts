import { GenericFormModel } from "@shared/generic-form-model";

export class WaitTimeModel implements GenericFormModel {
    id : number;
    maxWaitTime : string;
    maxClientTime : string;
    maxClientWaitingTime : string;

    constructor() {
        this.id = null;
        this.maxWaitTime = null;
        this.maxClientTime = null;
        this.maxClientWaitingTime = null;
    }

    setData() {}
}