import { GenericFormModel } from "@shared/generic-form-model";

export class FeaturesModel implements GenericFormModel {
    id : number;
    type : string;
    languages : Array <number>;
    pickUp : string;
    pickTo : string;    
    location : string;

    constructor() {
        this.id = null;
        this.type = null;
        this.languages = [];
        this.pickUp = null
        this.pickTo = null;        
        this.location = null;
    }

    setData() {}

}