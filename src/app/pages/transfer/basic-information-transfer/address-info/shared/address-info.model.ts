import { Utilities } from "@shared/utilities";

export class AddressInfoModel {

    address: string;            
    country:string ;            
    state: string; 
    city: string;             
    zip: string;     

    constructor() {
        this.address= '';     
        this.country= '';               
        this.state=   '';    
        this.city=    '';               
        this.zip=     '';    
    }
}
