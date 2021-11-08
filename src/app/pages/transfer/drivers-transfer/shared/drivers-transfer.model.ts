import { Utilities } from "@shared/utilities";
import { DriversTransferEnum } from "./drivers-transfer.enum";
import { GenericFormModel } from "@shared/generic-form-model";

export class DriversTransferModel implements GenericFormModel {
    id : number;
    transferId: number;
    driversList: Array<DriversTransferItemModel>;

    constructor(){
        this.id = null;
        this.transferId = null;
        this.driversList = [];
    }

    setData(data) {
        if(data.transferDrivers) {
            this.transferId = data.transferDrivers.transferServiceId;
            this.id = data.transferDrivers.transferServiceId;
            let list = [];
            
            if(data.transferDrivers.transferDrivers) {                                
                data.transferDrivers.transferDrivers.forEach ( item => {
                    let element = new DriversTransferItemModel();                   
                    element.id = item.id;
                    element.driverName = item.driverName;
                    element.driverLicenceId = item.driverLicenceId;
                    element.birthday = item.birthday;
                    if(item.vehiclesTypes) {
                        item.vehiclesTypes.forEach( object => {
                            element.vehiclesTypes.push(object);
                        })
                    }
                    if(item.contactPhone){
                        item.contactPhone.forEach ( object => {
                            element.contactPhone.push (object);
                        })
                    }
                    element.periodToworkFrom = item.periodToworkFrom;
                    element.periodToworkTo = item.periodToworkTo;
                    if(item.languages) {
                        item.languages.forEach ( object => {
                            element.languages.push(object);
                        })
                    }
                    list.push(element);
                });                
            }
            this.driversList = new Array<DriversTransferItemModel>();
            this.driversList = list;
        }
    }
}

export class DriversTransferItemModel {
    id: number;
    driverName:      string;
    driverLicenceId: string;
    birthday:        string;
    vehiclesTypes:    Array <number>;
    contactPhone:    Array<string>;
    periodToworkFrom:string;
    periodToworkTo:  string;
    languages: Array <number>;

    constructor ()  {        
        this.driverName = '';
        this.driverLicenceId =  '';
        this.birthday = '';
        this.vehiclesTypes = [];
        this.contactPhone = [];
        this.periodToworkFrom = null;
        this.periodToworkTo = null;
        this.languages = [];
    }
}



