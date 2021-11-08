import { ViewDetailsVehiclesEnum } from "./view-details-vehicles-enum";
import { Utilities } from "@shared/utilities";
import { ViewDetailsServicesModel } from "../../view-details-services/shared/view-details-services-model";
import { GenericModel } from "@shared/generic-model";

export class ViewDetailsVehiclesModel {
    transferId : number;
    totalDrivers : number;
    totalCars : number;
    totalTrucks : number;
    totalBus : number;
    totalVehicles : number;
    listViewDetailsVehiclesModel : Array<ListViewDetailsVehiclesModel>;
    listDrivers : Array<GenericModel>;
    listViewDetailsServices :  Array<ViewDetailsServicesModel>;

    constructor() {
        this.transferId = null;
        this.totalDrivers = ViewDetailsVehiclesEnum.valueZero;
        this.totalCars = ViewDetailsVehiclesEnum.valueZero;
        this.totalTrucks = ViewDetailsVehiclesEnum.valueZero;
        this.totalBus = ViewDetailsVehiclesEnum.valueZero;
        this.totalVehicles = null;
        this.listViewDetailsVehiclesModel = [];
        this.listDrivers = [];
        this.listViewDetailsServices = new Array<ViewDetailsServicesModel>();
    }

    setData(totalVehicles, vehiclesFeatures, drivers, settings) {
        this.totalVehicles = totalVehicles;
        this.totalDrivers = drivers ? 
                (drivers.transferDrivers ? drivers.transferDrivers.length : ViewDetailsVehiclesEnum.valueZero) 
            : ViewDetailsVehiclesEnum.valueZero;

        if(vehiclesFeatures) {
            this.transferId = vehiclesFeatures.transferServiceId;
            if(vehiclesFeatures.vehiclesInfo) {
                vehiclesFeatures.vehiclesInfo.forEach(item => {
                    let object = new ListViewDetailsVehiclesModel();
                    object.setData(item);
                    this.listViewDetailsVehiclesModel.push(object);
                    this.calculateTotals(item.categoryName);
                })
            }
        }
        
        if(drivers){            
            if(drivers.transferDrivers) {
                drivers.transferDrivers.forEach( item => {
                    let object = new GenericModel();
                    object.id = item.id;
                    object.name = item.driverName;
                    this.listDrivers.push(object);
                })
            }
        }

        if(settings) {
            if(settings.settingsList) {
                settings.settingsList.forEach ( item => {
                    let object = new ViewDetailsServicesModel();
                    object.setData(item, settings.transferServiceId);
                    this.listViewDetailsServices.push(object);
                })
            }
        }
    }

    calculateTotals(type : string) {
        switch(type) {
            case ViewDetailsVehiclesEnum.car : this.totalCars += ViewDetailsVehiclesEnum.valueOne;
                break;
            case ViewDetailsVehiclesEnum.truck : this.totalTrucks += ViewDetailsVehiclesEnum.valueOne;
                break;
            case ViewDetailsVehiclesEnum.bus: this.totalBus += ViewDetailsVehiclesEnum.valueOne;
        }
    }   
}

export class ListViewDetailsVehiclesModel {
    id : number;
    brand : string;
    model : string;
    transportType : string;
    capacity: string;
    stock : string;

    constructor() {
        this.id = null;
        this.brand = null;
        this.model = null;
        this.transportType = null;
        this.capacity = null;
        this.stock = null; 
    }

    setData(data) {
        this.id = data.id;
        this.brand = data.brand;
        this.model = data.modelType;
        this.transportType = data.transportType;
        this.capacity = data.capacity;
        this.stock = data.quantity;
    }
}