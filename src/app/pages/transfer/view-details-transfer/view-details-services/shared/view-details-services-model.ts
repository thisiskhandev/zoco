import { GenericModel } from "@shared/generic-model";
import { Utilities } from "@shared/utilities";

export class ViewDetailsServicesModel {
    id : number;
    vehicleId : number;
    plate : string;
    children : string;
    pets : string;
    door : string;
    stop : number;
    availability : string;
    driversAsigned  : string;
    bagsWeight : string;
    length : number;
    width : number;
    height : number;
    scheduleType : string;

    constructor() {
        this.id = null;
        this.vehicleId = null;
        this.plate = null;
        this.children = null;
        this.pets = null;;
        this.door = null;
        this.stop = null;
        this.availability = null;
        this.driversAsigned  = null;
        this.bagsWeight = null;
        this.length = null;
        this.width = null;
        this.height = null;
        this.scheduleType = null;
    }

    setData(data, transferId){
        this.id = data.id;
        this.vehicleId = data.vehicleFeatureId;
        this.plate = data.vehiclePlate;
        this.children = data.haveChildren;
        this.pets = data.allowPets;
        this.door = data.doorToDoor;
        this.stop = data.stopsOrPickups;
        this.availability = data.availableHours + Utilities.urlRouteSeparator + data.availableDays;
        this.driversAsigned  = data.transferDriverId.name;
        this.bagsWeight = data.bagWeight;
        this.length = data.bagLength;
        this.width = data.bagWidth;
        this.height = data.bagHeight;
        this.scheduleType = data.scheduleType;
    }

}
